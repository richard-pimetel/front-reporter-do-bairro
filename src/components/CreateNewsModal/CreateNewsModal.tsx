import React, { useState, useRef, useEffect } from 'react';
import './CreateNewsModal.css';
import InputEndereco from '../InputEndereco/inputEndereco';
import CategoryButtons from '../CategoryButtons/CategoryButtons';
import { Endereco, NoticiaCreatePayload, Categoria } from '../../types';
import { uploadFileToAzure } from '../../services/azureUpload';
import { useAuth } from '../../contexts/AuthContext';
import { getCategories } from '../../API/categoria/getCategoria';

interface CreateNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (noticiaData: NoticiaCreatePayload) => Promise<void>;
}

function CreateNewsModal({ isOpen, onClose, onSave }: CreateNewsModalProps) {
  const { user } = useAuth();
  const [titulo, setTitulo] = useState<string>('');
  const [conteudo, setConteudo] = useState<string>('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState<Endereco | null>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [imageUrls, setImageUrls] = useState<string>('');
  const [availableCategories, setAvailableCategories] = useState<Categoria[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carrega as categorias quando o modal é aberto (isOpen muda para true)
  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try { // Adicionado try-catch para lidar com erros na busca de categorias
          const response = await getCategories();
          if (response && response.categorias) {
            setAvailableCategories(response.categorias);
          } else {
            console.error('Falha ao carregar categorias: Resposta inválida.');
            setAvailableCategories([]);
          }
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
          setAvailableCategories([]);
          alert('Erro ao carregar categorias. Por favor, tente novamente mais tarde.');
        }
      };
      fetchCategories();
    } else {
      // Limpar campos e estados quando o modal é fechado
      setTitulo('');
      setConteudo('');
      setSelectedCategoryIds([]);
      setEnderecoSelecionado(null);
      setImageFiles(null);
      setImageUrls('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setAvailableCategories([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFiles(event.target.files);
  };

  const handleSave = async () => {
    // Validação mais robusta para enderecoSelecionado
    if (!titulo || !conteudo || selectedCategoryIds.length === 0 || !user?.id ||
        !enderecoSelecionado || !enderecoSelecionado.cep || !enderecoSelecionado.display_name ||
        enderecoSelecionado.lat === undefined || enderecoSelecionado.lon === undefined) {
      alert('Por favor, preencha todos os campos obrigatórios: Título, Conteúdo, Categorias, Endereço e CEP.');
      return
    }

    const allMediaUrls: string[] = []

    // 1. Upload de arquivos locais para Azure Blob Storage
    if (imageFiles && imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i]
        const sasToken = 'sp=racwl&st=2025-06-10T02:35:11Z&se=2025-06-10T10:35:11Z&sv=2024-11-04&sr=c&sig=dvVA1a55li0hkl9MGNYZxwwIhneiVD%2F2yup3Zi%2BO2PU%3D'

        const uploadParams = {
          file: file,
          storageAccount: 'imgevideodenoticias',
          sasToken: sasToken,
          containerName: 'imagens',
        };

        try {
          const uploadedUrl = await uploadFileToAzure(uploadParams);
          if (uploadedUrl) {
            allMediaUrls.push(uploadedUrl);
          } else {
            alert(`Falha ao carregar o arquivo: ${file.name}. URL de upload não retornada.`);
            return; // Interrompe o processo se um upload falhar
          }
        } catch (uploadError) {
          console.error(`Erro no upload do arquivo ${file.name} para Azure Blob Storage:`, uploadError);
          alert(`Erro no upload do arquivo ${file.name}. Verifique o SAS Token e permissões.`);
          return; // Interrompe o processo se um upload falhar
        }
      }
    }

    // 2. Adicionar URLs digitadas
    if (imageUrls.trim()) {
      const urlsFromInput = imageUrls.split('\n')
                                     .map(url => url.trim())
                                     .filter(url => url !== '');
      allMediaUrls.push(...urlsFromInput);
    }

    // Formata a data para "YYYY-MM-DD"
    const dataPostagemFormatada = new Date().toISOString().slice(0, 10);

    const noticiaData: NoticiaCreatePayload = {
      titulo,
      conteudo,
      tbl_usuario_id: user.id,
      endereco: {
        cep: enderecoSelecionado.cep, // Já validado como string não-vazia acima
        display_name: enderecoSelecionado.display_name,
        lat: enderecoSelecionado.lat,
        lon: enderecoSelecionado.lon,
      },
      urls_midia: allMediaUrls.length > 0 ? allMediaUrls : undefined, // Permite undefined se não houver mídias
      categorias: selectedCategoryIds,
      data_postagem: dataPostagemFormatada, // Usa a data formatada
    };

    try {
      await onSave(noticiaData);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar notícia:", error);
      alert('Erro ao criar a notícia. Verifique o console para mais detalhes.');
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Enviar nova notícia</h3>
          <button onClick={handleCloseClick} className="modal-close-button">
            <ion-icon name="close"></ion-icon>
          </button>
        </div>
        <div className="modal-body">
          <label>Título *</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título da notícia"
            required
          />

          <label>Categorias *</label>
          <CategoryButtons
            categories={availableCategories}
            onCategoryChange={setSelectedCategoryIds}
            initialSelectedCategories={selectedCategoryIds}
          />

          <label>Conteúdo *</label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            placeholder="Digite o conteúdo completo da notícia"
            rows={6}
            required
          ></textarea>

          <label>Endereço *</label>
          {/* setResultadoEndereco espera CoordenadasComEndereco, mas Endereco é o que você precisa */}
          {/* Se InputEndereco já retorna Endereco, a tipagem está ok. */}
          <InputEndereco setResultadoEndereco={setEnderecoSelecionado} />
          {enderecoSelecionado && (
            <p className="endereco-selecionado">Endereço selecionado: {enderecoSelecionado.display_name}</p>
          )}

          <label>Mídias (Imagens/Vídeos)</label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <textarea
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
            placeholder="Ou cole URLs de imagens/vídeos (uma por linha)"
            rows={4}
          ></textarea>

        </div>
        <div className="modal-footer">
          <button className="btn-cancelar" onClick={handleCloseClick}>Cancelar</button>
          <button className="btn-enviar" onClick={handleSave}>Enviar notícia</button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewsModal;
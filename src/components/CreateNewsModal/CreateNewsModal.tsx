// src/components/CreateNewsModal/CreateNewsModal.tsx
import React, { useState, useRef } from 'react';
import './CreateNewsModal.css';
import InputEndereco from '../InputEndereco/inputEndereco';
import CategoryButtons from '../CategoryButtons/CategoryButtons';
import { Endereco, NoticiaCreatePayload } from '../../types';
import { uploadFileToAzure } from '../../services/azureUpload';
import { useAuth } from '../../contexts/AuthContext';

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFiles(event.target.files);
  };

  const handleSave = async () => {
    if (!titulo || !conteudo || selectedCategoryIds.length === 0 || !enderecoSelecionado || !user?.id) {
      alert('Por favor, preencha todos os campos obrigatórios: Título, Conteúdo, Categorias e Endereço.');
      return;
    }

    const allMediaUrls: string[] = [];

    // 1. Upload de arquivos locais
    if (imageFiles && imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        // Parâmetros de upload do Azure - SUBSTITUA PELOS SEUS VALORES REAIS
        const uploadParams = {
          file: file,
          storageAccount: 'tutorialupload', // SEU STORAGE ACCOUNT
          sasToken: 'sp=racwl&st=2025-05-13T14:27:31Z&se=2025-05-30T22:27:31Z&sv=2024-11-04&sr=c&sig=Jom%2FgMFugyhtw5SZokN0Pe%2BQf7c2ciA8KP9SckR%2FPfc%3D', // SEU SAS TOKEN
          containerName: 'fotos', // SEU CONTAINER NAME
        };
        const uploadedUrl = await uploadFileToAzure(uploadParams);
        if (uploadedUrl) {
          allMediaUrls.push(uploadedUrl);
        } else {
          alert(`Falha ao carregar o arquivo: ${file.name}`);
          return;
        }
      }
    }

    // 2. Adicionar URLs digitadas
    if (imageUrls.trim()) {
      const urlsFromInput = imageUrls.split('\n').map(url => url.trim()).filter(url => url !== '');
      allMediaUrls.push(...urlsFromInput);
    }

    // Pega a data e hora atual do navegador
    const currentDateTime = new Date().toISOString(); // Formato ISO 8601 (ex: "2023-10-27T10:30:00.000Z")

    const noticiaData: NoticiaCreatePayload = {
      titulo,
      conteudo,
      tbl_usuario_id: user.id,
      endereco: {
        cep: enderecoSelecionado.cep || '00000-000',
        display_name: enderecoSelecionado.display_name,
        lat: enderecoSelecionado.lat,
        lon: enderecoSelecionado.lon,
      },
      urls_midia: allMediaUrls.length > 0 ? allMediaUrls : undefined,
      categorias: selectedCategoryIds,
      data_postagem: currentDateTime // Adiciona a data/hora atual
    };

    try {
      await onSave(noticiaData);
      onClose();
      // Limpa os campos
      setTitulo('');
      setConteudo('');
      setSelectedCategoryIds([]);
      setEnderecoSelecionado(null);
      setImageFiles(null);
      setImageUrls('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error("Erro ao salvar notícia:", error);
      alert('Erro ao criar a notícia. Tente novamente.');
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

export default CreateNewsModal
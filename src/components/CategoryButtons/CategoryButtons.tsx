import './CategoryButtons.css';
import { Categoria } from '../../types'; // Importa a interface Categoria

interface CategoryButtonsProps {
  categories: Categoria[]; // Agora espera um array de Categoria
  initialSelectedCategories: number[];
  onCategoryChange: (selectedIds: number[]) => void;
}

function CategoryButtons({ categories, initialSelectedCategories, onCategoryChange }: CategoryButtonsProps) {
  const isSelected = (categoryId: number) => {
    return initialSelectedCategories.includes(categoryId);
  };

  const handleButtonClick = (categoryId: number) => {
    let newSelectedCategories: number[];
    if (isSelected(categoryId)) {
      // Remove a categoria se já estiver selecionada
      newSelectedCategories = initialSelectedCategories.filter(id => id !== categoryId);
    } else {
      // Adiciona a categoria se não estiver selecionada
      newSelectedCategories = [...initialSelectedCategories, categoryId];
    }
    onCategoryChange(newSelectedCategories);
  };

  return (
    <div className="category-buttons-container">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-button ${isSelected(category.id) ? 'selected' : ''}`}
          onClick={() => handleButtonClick(category.id)}
        >
          {category.nome}
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;
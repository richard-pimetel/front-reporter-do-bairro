// src/components/CategoryButtons/CategoryButtons.tsx
import { useEffect, useState } from 'react';
import { Categoria } from '../../types'
import { fetchCategories } from '../../API/categoria/getCategoria'
import './CategoryButtons.css'

interface CategoryButtonsProps {
  onCategoryChange: (selectedCategoryIds: number[]) => void;
  initialSelectedCategories?: number[]; // Opcional, para pré-selecionar
}

function CategoryButtons({ onCategoryChange, initialSelectedCategories = [] }: CategoryButtonsProps) {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(initialSelectedCategories);

  useEffect(() => {
    async function getCategories() {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    }
    getCategories();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryIds((prevSelected) => {
      let newSelected;
      if (prevSelected.includes(categoryId)) {
        newSelected = prevSelected.filter((id) => id !== categoryId);
      } else {
        newSelected = [...prevSelected, categoryId];
      }
      onCategoryChange(newSelected); // Notifica o componente pai
      return newSelected;
    });
  };

  return (
    <div className="category-buttons-container">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-button ${selectedCategoryIds.includes(category.id!) ? 'selected' : ''}`}
          onClick={() => handleCategoryClick(category.id!)} // O id será number, garantido pela API
        >
          {category.nome}
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;
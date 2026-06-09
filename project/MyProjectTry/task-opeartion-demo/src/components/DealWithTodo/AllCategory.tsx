import type { Category } from "../../types/category";
import TodoCategory from "./TodoCategory​";
import useCategoriesStore from '../../store/Categories';

export default function AllCategory({ categories }) {
    const newCategoryId = useCategoriesStore((state) => state.newCategoryId);
    
    return (
        <div className="all-category">
            <h3>所有分类</h3>
            <div className="category-scroll-container">
                <div className="category-list">
                    {
                        categories.map((category: Category) =>
                            <TodoCategory 
                                key={category.id} 
                                category={category} 
                                isNew={category.id === newCategoryId}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
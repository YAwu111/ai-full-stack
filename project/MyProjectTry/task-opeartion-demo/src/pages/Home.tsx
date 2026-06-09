import CategoryAdd from '../components/DealWithTodo/CategoryAdd';
import AllCategory from '../components/DealWithTodo/AllCategory';
import useCategoriesStore from '../store/Categories';

export default function Home() {
  const { categories, categoryAdd } = useCategoriesStore();
  
  return (
    <div className="home-page">
      <CategoryAdd categoryAdd={categoryAdd} />
      <AllCategory categories={categories} />
    </div>
  )
}
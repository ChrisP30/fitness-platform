import Link from "next/link";

const CategoryItem = ({ category }) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="h-[50px] border-b-2 border-b-white transition-all duration-500 hover:bg-white">
        <h3 className="ml-4 p-3">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryItem;

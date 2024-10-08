/* eslint-disable @next/next/no-img-element */
const renderElement = (element, index) => {
    console.log(element);
    switch (element.type) {
        case 'paragraph':
            return <p key={index} className="text-white text-sm lg:text-base my-5 p-5">{element.children.map((child, index) => child.text)}</p>;
        case 'image':
            return <img key={index} src={element.url} alt={element.alt || 'Image'} />;
        // Add more cases as needed for other element types
        default:
            return null; // or some default rendering
    }
};

const ProductDescription = ({ description }) => {
    return (
        <div>
            {description.map((element, index) => renderElement(element, index))}
        </div>
    );
};

export default ProductDescription;
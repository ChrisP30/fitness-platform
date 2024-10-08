/* eslint-disable @next/next/no-img-element */
import React from "react";
import moment from "moment";
import Image from "next/image";
import { graphCMSImageLoader } from "../util";

const Paragraph = ({ id, children }) => (
  <p className="px-1 py-6 text-sm md:p-8 md:text-base lg:text-lg lg:p-10" key={id}>
    {children}
  </p>
);

const ImageNode = ({ src, alt, id }) => (
  <img
    src={src}
    alt={alt || "Image"}
    className="py-6 w-full h-[400px] transition-all duration-700 object-cover"
    key={id}
  />
);

const Heading = ({ level, id, children }) => {
  const Tag = `h${level}`;
  return (
    <Tag key={id} className="flex justify-center mt-4 text-xl md:text-3xl">
      {children}
    </Tag>
  );
};

const ListItem = ({ id, children }) => <li key={id}>{children}</li>;

const List = ({ id, children }) => <ul key={id}>{children}</ul>;

const Iframe = ({ url, id }) => (
  <iframe
    src={url}
    className="py-6 w-full h-[350px] transition-all duration-700"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="YouTube video"
    key={id}
  ></iframe>
);

const EmbeddedEntryBlock = ({ node, id }) => {
  if (node.data.target.__typename === "Product") {
    const product = node.data.target;
    return (
      <div key={id} className="product-embed">
        <img src={product.image.url} alt={product.name} style={{ maxWidth: "100%" }} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <a href={`/products/${product.slug}`}>View Product</a>
      </div>
    );
  }
  return null;
};

const renderRichText = (node, id) => {
  switch (node.type) {
    case "paragraph":
      return <Paragraph key={id} id={id}>{node.children.map((child, childId) => renderRichText(child, childId))}</Paragraph>;
    case "image":
      return <ImageNode key={id} src={node.src} alt={node.alt} />;
    case "heading-one":
      return <Heading key={id} id={id} level={1}>{node.children.map((child, childId) => renderRichText(child, childId))}</Heading>;
    case "heading-two":
      return <Heading key={id} id={id} level={2}>{node.children.map((child, childId) => renderRichText(child, childId))}</Heading>;
    case "heading-three":
      return <Heading key={id} id={id} level={3}>{node.children.map((child, childId) => renderRichText(child, childId))}</Heading>;
    case "heading-four":
      return <Heading key={id} id={id} level={4}>{node.children.map((child, childId) => renderRichText(child, childId))}</Heading>;
    case "heading-five":
      return <Heading key={id} id={id} level={5}>{node.children.map((child, childId) => renderRichText(child, childId))}</Heading>;
    case "heading-six":
      return <Heading key={id} id={id} level={6}>{node.children.map((child, childId) => renderRichText(child, childId))}</Heading>;
    case "list-item":
      return <ListItem key={id} id={id}>{node.children.map((child, childId) => renderRichText(child, childId))}</ListItem>;
    case "list":
      return <List key={id} id={id}>{node.children.map((child, childId) => renderRichText(child, childId))}</List>;
    case "iframe":
      return <Iframe key={id} id={id} url={node.url} />;
    case "embedded-entry-block":
      return <EmbeddedEntryBlock key={id} id={id} node={node} />;
    default:
      return node.text ? node.text : null; // Text nodes
  }
};

const PostDetail = ({ postDetails }) => {
  return (
    <div className="flex flex-col px-6 text-gray-600 min-h-[600px] custom-bg shadow-xl border-4 border-white my-[20px] rounded-xl transition-transform duration-1000 hover:scale-[1.01]">
      <div className="w-full h-[300px] mt-4 relative shadow-xl border-2 border-white mb-5 overflow-hidden">
        <Image
          loader={graphCMSImageLoader}
          src={postDetails.featuredImage.url}
          alt="Featured Image"
          layout="fill"
          className="object-cover absolute inset-0"
        />
      </div>
      <div className="flex flex-col ml-10 items-left w-full lg:ml-0 lg:flex-row lg:w-full lg:justify-center lg:h-[100px]">
        <div className="flex items-center mb-2 lg:mb-0 lg:mr-4">
          <img
            src={postDetails.author.photo.url}
            alt=""
            className="w-[30px] h-[30px] rounded-full mr-1"
          />
          <h4 className="text-lg">{postDetails.author.name}</h4>
        </div>
        <div className="flex items-center">
          <p className="text-lg">
            🗓️ {moment(postDetails.createdAt).format("MM-DD-YYYY")}
          </p>
        </div>
      </div>
      <div className="flex mt-10 justify-center px-4 md:px-10">
        <h3 className="text-3xl md:text-4xl">{postDetails.title}</h3>
      </div>
      <div>
        {postDetails.content.raw.children.map((item, id) =>
          renderRichText(item, id)
        )}
      </div>
    </div>
  );
};

export default PostDetail;

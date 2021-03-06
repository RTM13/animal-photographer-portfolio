import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import AniLink from "gatsby-plugin-transition-link/AniLink";

function GalleryCategories() {
  const data = useStaticQuery(graphql`
    query CategoryQuery {
      allContentfulCategories {
        nodes {
          id
          category
          slug
          categoryImage {
            id
            fixed(height: 400, width: 270, quality: 80) {
              base64
              tracedSVG
              aspectRatio
              srcWebp
              srcSetWebp
            }
          }
        }
      }
    }
  `);
  // Extract categories to loop through
  const result = data.allContentfulCategories.nodes;

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center my-5 pb-5"
    >
      <h1>Categories</h1>
      <Row
        xl="3"
        lg="1"
        md="1"
        sm="1"
        as="section"
        style={{ minHeight: "400px", height: "70%" }}
        className=" my-3 justify-content-center "
      >
        {result.map((category, index) => (
          <Col
            key={index}
            className="my-3"
            style={{
              minWidth: "300px",
              minHeight: "400px",
              maxWidth: "270px",
            }}
          >
            {" "}
            <AniLink
              key={category.id}
              to={`/gallery/${category.slug}`}
              hex="#3D314A"
              paintDrip
            >
              <div
                className="h-100"
                // {onClick={() => navigate(`/gallery/${category.slug}`)}}
              >
                <CategoryImage
                  loading="eager"
                  fixed={category.categoryImage.fixed}
                  className="w-100 h-100"
                  category={category.category}
                  imgStyle={{ objectFit: "contain" }}
                />
              </div>
            </AniLink>
          </Col>
        ))}
      </Row>
      <GalleryButton className="mt-2" cover to="/gallery">
        Gallery
      </GalleryButton>
    </Container>
  );
}

GalleryCategories.propTypes = {
  data: PropTypes.object.isRequired,
};

const CategoryImage = styled(Img)`
  &::before {
    content: ${props => `"${props.category ? props.category : ""}"`};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    opacity: 0.2;
    margin-bottom: 0.75rem;

    font-size: 2.5rem;
    font-weight: 700;

    color: #f3f3f3aa;
    background-color: #33333399;

    height: 100%;

    visibility: hidden;

    transition: all 0.3s ease-out;
  }

  &:hover::before {
    visibility: visible;
    font-size: 4rem;
    opacity: 1;
  }
`;

const GalleryButton = styled(AniLink)`
  color: #f5f5f5;
  background: #663399;

  padding: 0.65rem 1rem;
  border-radius: 3px;

  &:hover {
    color: white;
    box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);
    translate: 0 -1px;
  }
`;

export default GalleryCategories;

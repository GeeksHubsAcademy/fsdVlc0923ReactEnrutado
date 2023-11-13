import React, { useState, useEffect } from "react";
import "./Home.css";
import { bringCharacters } from "../../services/apiCalls";
import { Container, Row, Col } from "react-bootstrap";

export const Home = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (characters.length === 0) {
      bringCharacters()
        .then((results) => {
          setCharacters(results.data.results);
        })
        .catch((error) => console.log(error));
    }
  }, [characters]);

  return (
    <div className="homeDesign">
      {characters.length > 0 ? (
        <Container>
          <Row>
            {characters.map((character) => {
              return (
                <Col sm={12} lg={6} xl={2} xxl={2} key={character.id}>
                  {/* {character.name} */}
                  <img className='avatarCharacter' src={character.image} alt={character.name} />
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <div>aun no han venido</div>
      )}
    </div>
  );
};

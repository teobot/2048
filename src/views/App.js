import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import "../styles/App.css";

let tempScore = 0;

function App() {
  const [gameOver, setGameOver] = useState(false);

  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const addToScore = (v) => {
    tempScore += v;
  };

  useEffect(() => {
    // run the addTile function on window load
    addTile();

    // add a event listener for arrow key presses
    document.addEventListener("keydown", handleKeyDown);
    // return a function to remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const colourDecider = (cell) => {
    switch (cell) {
      case 2:
        return {
          text: "#776e65",
          background: "#FAE7E0",
        };
      case 4:
        return {
          text: "#7F7169",
          background: "#F6E8CB",
        };
      case 8:
        return {
          text: "#fff",
          background: "#F9B37C",
        };
      case 16:
        return {
          text: "#fff",
          background: "#F59563",
        };
      case 32:
        return {
          text: "#fff",
          background: "#F67C60",
        };
      case 64:
        return {
          text: "#fff",
          background: "#F65E3B",
        };
      case 128:
        return {
          text: "#fff",
          background: "#EDCF73",
        };
      case 256:
        return {
          text: "#fff",
          background: "#EDCC62",
        };
      case 512:
        return {
          text: "#fff",
          background: "#EDC850",
        };
      case 1024:
        return {
          text: "#fff",
          background: "#EDC53F",
        };
      case 2048:
        return {
          text: "#fff",
          background: "#EDC22D",
        };
      default:
        return {
          text: "#776e65",
          background: "#faf8ef",
        };
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        move({ up: true });
        break;
      case "ArrowDown":
        move({ down: true });
        break;
      case "ArrowLeft":
        move({ left: true });
        break;
      case "ArrowRight":
        move({ right: true });
        break;
      default:
        break;
    }
  };

  const move = ({ up = false, down = false, left = false, right = false }) => {
    if (!up && !down && !left && !right) return;
    const newGrid = [...grid];
    let moving = true;
    let s = 0;
    while (moving) {
      let moved = false;
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          if (newGrid[i][j] !== 0) {
            if (down || up) {
              let next = i + (down ? 1 : -1);
              if (newGrid[next] !== undefined) {
                if (newGrid[next][j] === 0) {
                  newGrid[next][j] = newGrid[i][j];
                  newGrid[i][j] = 0;
                  moved = true;
                } else if (newGrid[next][j] === newGrid[i][j]) {
                  newGrid[next][j] = newGrid[i][j] * 2;
                  s += newGrid[i][j] * 2;
                  newGrid[i][j] = 0;
                  moved = true;
                }
              }
            } else if (left || right) {
              let kk = right ? j + 1 : j - 1;
              if (newGrid[i][kk] !== undefined) {
                if (newGrid[i][kk] === 0) {
                  newGrid[i][kk] = newGrid[i][j];
                  newGrid[i][j] = 0;
                  moved = true;
                } else if (newGrid[i][kk] === newGrid[i][j]) {
                  newGrid[i][kk] = newGrid[i][j] * 2;
                  s += newGrid[i][j] * 2;
                  newGrid[i][j] = 0;
                  moved = true;
                }
              }
            }
          }
        }
      }
      if (!moved) {
        moving = false;
      }
    }

    addToScore(s);
    setGrid(newGrid);
    addTile();
  };

  const addTile = () => {
    const newGrid = [...grid];
    let processing = true;

    let space = false;
    // check if there is an empty space
    for (let x = 0; x < grid.length; x++) {
      const row = grid[x];
      for (let y = 0; y < row.length; y++) {
        const cell = row[y];
        if (cell === 0) {
          space = true;
        }
      }
    }

    if (space) {
      while (processing) {
        const randomRow = Math.floor(Math.random() * 4);
        const randomCol = Math.floor(Math.random() * 4);

        const trueOrFalse = Math.random() > 0.5;

        if (newGrid[randomRow][randomCol] === 0) {
          newGrid[randomRow][randomCol] = trueOrFalse ? 2 : 4;
          processing = false;
        }
      }
      setGrid(newGrid);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="App">
      <div
        className="p-4"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <div
          className="p-2"
          style={{
            height: 75,
            width: 75,
            backgroundColor: "#bbada0",
            color: "#fff",
            borderRadius: 5,
          }}
        >
          <span>SCORE</span>
          <h3 className="m-0 p-0" style={{ fontWeight: "bolder" }}>
            {tempScore}
          </h3>
        </div>
      </div>

      <Container className="d-flex justify-content-center">
        <div
          className="m-4 border border-4 rounded p-0"
          style={{
            backgroundColor: "#bbada0",
            width: 800,
            height: 800,
          }}
        >
          {grid.map((row, rowIndex) => {
            return (
              <Row
                key={rowIndex}
                className="d-flex flex-row w-100 h-25 m-0 p-0"
              >
                {row.map((cell, cellIndex) => {
                  const { text, background } = colourDecider(cell);
                  return (
                    <Col
                      className="m-3 rounded rounded-5"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "4rem",
                        fontWeight: "bold",
                        backgroundColor: background,
                        color: text,
                      }}
                      key={cellIndex}
                    >
                      {cell}
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default App;

import { useEffect, useRef } from "react";
import Button from "../Button/Button";
import "./Calculator.scss";
import {
  AiOutlineDelete,
  AiOutlineUnlock,
  AiOutlineLock,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { BsFillCircleFill } from "react-icons/bs";
import { Sign } from "../../shared/AppInterface";
import { useReducer } from "react";
import calcReducer, { initialState } from "../../shared/AppReducer";
import { useTheme } from "../../shared/ThemeContext";

const Calculator = () => {
  // Get row data from LS or assign Initial State if empty
  const [rows, dispatch] = useReducer(
    calcReducer,
    (localStorage.getItem("rowsData") &&
      JSON.parse(localStorage.getItem("rowsData") as string)) ||
      initialState
  );

  useEffect(() => {
    // Save data to LS on change
    localStorage.setItem("rowsData", JSON.stringify(rows));
  }, [rows]);

  // Input ref to focus on last row
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set input cursor to the last input on add/deletion of row
    if (inputRef.current) inputRef.current.focus();
  }, [rows.length]);

  // Hook to change the theme
  const { darkMode, setDarkMode } = useTheme();

  // Handler to add new row
  const handleAddRow = () => {
    dispatch({ type: "ADD_ROW" });
  };

  // Handler to delete row
  const handleDeleteRow = (index: number) => {
    dispatch({ type: "REMOVE_ROW", index });
  };

  // Handler to set new value to input
  const handleInput = (index: number, value: string) => {
    // When input is empty then assign value 0
    isNaN(parseInt(value))
      ? dispatch({ type: "SET_VALUE", index, value: 0 })
      : dispatch({ type: "SET_VALUE", index, value: parseInt(value) });
  };

  // Handler to change disabled state of input feilds
  const handleDisableState = (index: number, disabled: boolean) => {
    dispatch({ type: "SET_DISABLED", index, disabled });
  };

  // Handler for sign change
  const handleSignChange = (index: number, sign: Sign) => {
    dispatch({ type: "SET_SIGN", index, sign });
  };

  // Handler to add row when pressing 'Enter'

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('reached')
    if (e.key !== "Enter") return;
    e.preventDefault();
    dispatch({ type: "ADD_ROW" });
  };

  // Handler to get the total
  const getTotal = rows.reduce((acc, row) => {
    if (row.disabled) return acc;
    return row.sign === "+" ? acc + row.value : acc - row.value;
  }, 0);

  return (
    <div className="calc-container">
      <div className="btn-container">
        <Button onClick={handleAddRow} variant="green-btn">
          <AiOutlinePlusSquare />
          Add Row
        </Button>
        <label className="label toggle">
          <input
            aria-label="Theme toggle"
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="toggle_input"
            
          />
          <div className="toggle-control"></div>
        </label>
      </div>
      <div className="input-wrapper">
        {rows.map((row, index) => (
          <div key={index} className="row">
            <div className="input-container">
              <select
                name="operation"
                onChange={(e) =>
                  handleSignChange(index, e.target.value as Sign)
                }
                value={row.sign}
                disabled={row.disabled}
                style={{
                  borderColor: row.sign === "-" ? "#E84855" : "#79f74e",
                }}
              >
                <option value="+">+</option>
                <option value="-">-</option>
              </select>
              <input
                type="number"
                value={row.value || ""}
                placeholder="Enter a number"
                className="input"
                onChange={(e) => handleInput(index, e.target.value)}
                disabled={row.disabled}
                ref={index === rows.length - 1 ? inputRef : null}
                onKeyDown={(e) => handleEnterKey(e)}
              />
              <div className="action-buttons">
                <Button
                  onClick={() => handleDeleteRow(index)}
                  variant="red-btn"
                  disabled={rows.length < 2}
                >
                  <AiOutlineDelete />
                  <span>Delete</span>
                </Button>
                {row.disabled ? (
                  <Button
                    variant="orange-btn"
                    onClick={() => handleDisableState(index, !row.disabled)}
                  >
                    <AiOutlineUnlock />
                    <span>Enable&nbsp;</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleDisableState(index, !row.disabled)}
                  >
                    <AiOutlineLock />
                    <span>Disable</span>
                  </Button>
                )}
              </div>
            </div>
            <span
              style={{
                color: row.disabled
                  ? "#FED049"
                  : row.sign === "+"
                  ? "#79f74e"
                  : "#E84855",
                fontSize: "11px",
              }}
            >
              <BsFillCircleFill />
            </span>
          </div>
        ))}
      </div>
      <div
        className="total-container"
        style={{
          borderColor: getTotal < 0 ? "#E84855" : getTotal > 0 ? "#79f74e" : "",
        }}
      >
        Total : {getTotal.toLocaleString()}
      </div>
    </div>
  );
};

export default Calculator;

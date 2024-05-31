import React, { useState } from "react";
import Appbar from "./Appbar";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const QuizzStart = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("");
  const [v, setV] = useState("");

  const handleChange = (event) => {
    if (event.target.value === 10) {
      setLanguage("Hindi");
    } else if (event.target.value === 20) {
      setLanguage("English");
    } else {
      setLanguage("German");
    }
    setV(event.target.value);
  };

  const startTest = () => {
    navigate(`/quiz/${language}`);
  };

  const CustomFormControl = styled(FormControl)(() => ({
    width: "250px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
  }));
  return (
    <>
      <Appbar />
      <div
        style={{
          width: "470px",
          height: "290px",
          margin: "auto",
          marginTop: "200px",
          background: "#e1ebf9",
          color: "#262626",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          borderRadius: "15px",
          padding: "20px 25px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontSize: "24px",
            fontWeight: "700",
            textAlign: "center",
            paddingBottom: "1rem",
          }}
        >
          Welcome Learner!!
        </Typography>
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontSize: "16px",
            fontWeight: "700",
            paddingBottom: "1rem",
          }}
        >
          Select the language and your are ready to test your level
        </Typography>
        <div>
          <CustomFormControl>
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={v}
              label="Language"
              onChange={handleChange}
            >
              <MenuItem value={10}>Hindi</MenuItem>
              <MenuItem value={20}>English</MenuItem>
              <MenuItem value={30}>German</MenuItem>
            </Select>
          </CustomFormControl>
        </div>
        <Button
          sx={{
            position: "relative",
            top: "1rem",
            width: "200px",
            height: "50px",
          }}
          variant="contained"
          onClick={startTest}
        >
          Start Test
        </Button>
      </div>
    </>
  );
};

export default QuizzStart;

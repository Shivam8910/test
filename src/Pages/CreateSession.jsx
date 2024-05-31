import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Appbar from "../Components/Appbar";
import Topic from "../Components/Topic";
import TopicHeader from "../Components/TopicHeader";
import React, { useState } from "react";
import styled from "@emotion/styled";
import AccountProvider from "../context/AccountProvider";
import { useTranslation } from "react-i18next";


function CreateSession() {
  const [language, setLanguage] = React.useState("");
  const [v, setV] = useState("");
  const { t } = useTranslation();
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

  const CustomFormControl = styled(FormControl)(() => ({
    width: "288px",
    position: "relative",
    top: "10rem",
    left: "295px",
    borderRadius: "12px",
  }));

  const TopicBox = styled(Box)(() => ({
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    position: "relative",
  }));

  const TopicListBox = styled(Box)(() => ({
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    position: "relative",
    top: "11rem",
  }));

  return (
    <div>
      <AccountProvider>
        <Appbar />
      </AccountProvider>

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

      <TopicBox>
        <TopicHeader topic={t("iceb")} />
        <TopicHeader topic={t("gd")} />
        <TopicHeader topic={t("debate")} />
      </TopicBox>

      <TopicListBox>
        <Topic topicHeader={"Icebreaker"} language={language} />
        <Topic topicHeader={"Group Discussion"} language={language} />
        <Topic topicHeader={"Debate"} language={language} />
      </TopicListBox>
    </div>
  );
}

export default CreateSession;

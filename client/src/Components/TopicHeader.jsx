import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Card, Typography } from "@mui/material";

function TopicHeader({ topic }) {
  const theme = useTheme();

  const CustomCard = styled(Card)(() => ({
    height: "3.5rem",
    width: "18rem",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    position: "relative",
    top: "10.5rem",
    backgroundColor: theme.palette.pri.main,
    margin: "1rem 1rem 1rem 1rem",
    borderRadius: "13px",
  }));

  const CardContent = styled(Typography)(() => ({
    paddingTop: "13px",
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: "20px",
    letterSpacing: "3px",
  }));

  return (
    <CustomCard>
      <CardContent color="white">{topic}</CardContent>
    </CustomCard>
  );
}

export default TopicHeader;

import { Card } from "@mui/material";
import TopicItem from "./TopicItem";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Debate,
  GroupDiscussion,
  Icebreaker,
  Icebreakerhi,
  Debatehi,
  GroupDiscussionhi,
  Icebreakergr,
  Debategr,
  GroupDiscussiongr,
} from "../Assets/TopicDetail";

function Topic({ topicHeader, language}) {
  const theme = useTheme();

  const CustomCard = styled(Card)(() => ({
    height: "21rem",
    width: "18rem",
    backgroundColor: theme.palette.bg.main,
    margin: "1rem",
    borderRadius: "12px",
  }));

  const getTopicsByLanguage = (defaultTopics, hindiTopics, germanTopics) => {
    switch (language) {
      case "Hindi":
        return hindiTopics;
      case "German":
        return germanTopics;
      default:
        return defaultTopics;
    }
  };

  let topics = [];
  if (topicHeader === "Icebreaker") {
    topics = getTopicsByLanguage(Icebreaker, Icebreakerhi, Icebreakergr);
  } else if (topicHeader === "Debate") {
    topics = getTopicsByLanguage(Debate, Debatehi, Debategr);
  } else {
    topics = getTopicsByLanguage(GroupDiscussion, GroupDiscussionhi, GroupDiscussiongr);
  }

  return (
    <CustomCard
      sx={{
        boxShadow: "0",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {topics.map((item, index) => (
        <TopicItem
          key={index}
          topicHeader={topicHeader}
          topic={item.topic}
          language={language}
        />
      ))}
    </CustomCard>
  );
}

export default Topic;

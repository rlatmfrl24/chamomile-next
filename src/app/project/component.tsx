import { ProjectType } from "@/lib/typeDef";
import { Badge } from "@chakra-ui/react";

const ProjectBadgeProvider = (type: ProjectType) => {
  switch (type) {
    case ProjectType.General:
      return (
        <Badge key={type} colorScheme="green" width={"fit-content"}>
          General
        </Badge>
      );
    case ProjectType.Backend:
      return (
        <Badge key={type} colorScheme="red" width={"fit-content"}>
          Backend
        </Badge>
      );
    case ProjectType.Frontend:
      return (
        <Badge key={type} colorScheme="blue" width={"fit-content"}>
          Frontend
        </Badge>
      );
    case ProjectType.Android:
      return (
        <Badge key={type} colorScheme="purple" width={"fit-content"}>
          Android
        </Badge>
      );
    case ProjectType.ETC:
      return (
        <Badge key={type} colorScheme="yellow" width={"fit-content"}>
          ETC
        </Badge>
      );
  }
};

export { ProjectBadgeProvider };

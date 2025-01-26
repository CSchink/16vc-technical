import { Center, Title } from "@mantine/core";

interface PageTitleProps {
  title: string;
}

const PageTitle = (props: PageTitleProps) => {
  const { title } = props;

  return (
    <Center>
      <Title>{title}</Title>
    </Center>
  );
};

export default PageTitle;

import {Avatar, Box, Flex, Text} from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box
          mr="4"
          textAlign="right"
        >
          <Text>
            David Diniz
          </Text>
          <Text
            color="gray.300"
            fontSize="small"
          >
            davidwdiniz@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="David Diniz"
        src="https://github.com/davidwdiniz.png"
      />
    </Flex>
  )
}

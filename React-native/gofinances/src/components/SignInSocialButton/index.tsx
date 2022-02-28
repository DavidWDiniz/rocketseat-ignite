import React from "react";
import {Button, ImageContainer, Text } from "./styles";
import {RectButtonProps} from "react-native-gesture-handler";
import {SvgProps} from "react-native-svg";

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({title, svg: Svg, ...rest}: SignInSocialButtonProps) {
  return (
      <Button {...rest}>
        <ImageContainer>
          <Svg />
        </ImageContainer>

        <Text>
          {title}
        </Text>
      </Button>
  );
}

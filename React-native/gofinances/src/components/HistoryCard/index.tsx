import React from "react";
import {Amount, Container, Title } from "./styles";

interface HistoryCardProps {
  title: string;
  color: string;
  amount: string;
}

export function HistoryCard({color, title, amount}: HistoryCardProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}
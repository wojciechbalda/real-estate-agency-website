"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

const questionsAndAnswers = [
    {
        question: 'How should I prepare my home for sale?',
        answer: "Lorem Ipsum is placeholder text commonly used in the printing and typesetting industry. It doesn't have a specific meaning as it is derived from Latin, but it serves as a way to fill space and present a visual impression of how a document or design will look with real content"
    },
    {
        question: 'What legal steps do I need to take when buying or selling a property?',
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        question: 'Should I get a pre-inspection before selling my home?',
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
]

const FaqContent = () => {
  const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <Accordion>
        {questionsAndAnswers.map(item => <AccordionItem key={item.question} aria-label={item.question} title={item.question}>{item.answer}</AccordionItem>)}
    </Accordion>
  );
};

export default FaqContent;

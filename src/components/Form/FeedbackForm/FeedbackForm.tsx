"use client";

import { useActionState } from "react";
import {
    ButtonStyled,
    FormAreaStyled,
    FormPageStyled,
    FormStyled,
    HeaderStyled,
    InputStyled,
    LabelDetailsStyled,
    LabelStyled,
    TextAreaStyled,
    TextStyled,
} from "../FormStyled";
import { createFeedbackEmail } from "@/actions";
import { FormLoading } from "../Loading";

export const FeedbackForm = () => {
    const initialState = { status: "idle", message: "" } as
        | { status: "idle"; message: string }
        | { status: "success"; message: string }
        | { status: "error"; message: string };

    const [{ status, message }, formAction, pending] = useActionState(
        createFeedbackEmail,
        initialState,
    );

    if (pending) {
        return (
            <FormPageStyled>
                <FormAreaStyled>
                    <FormLoading />
                </FormAreaStyled>
            </FormPageStyled>
        );
    }

    if (status === "error") {
        return (
            <FormPageStyled>
                <FormAreaStyled>
                    {/* <FeedbackFormError /> */}
                    <p>{message || "Something went wrong"}</p>
                </FormAreaStyled>
            </FormPageStyled>
        );
    }

    if (status === "success") {
        return (
            <FormPageStyled>
                <FormAreaStyled>
                    {/* <FeedbackFormSuccess /> */}
                    <p>Success!</p>
                </FormAreaStyled>
            </FormPageStyled>
        );
    }

    return (
        <FormPageStyled>
            <FormAreaStyled>
                <HeaderStyled>Give feedback</HeaderStyled>
                <TextStyled>
                    Have some thoughts you&apos;d like to share? Ideas for how to
                    improve the site? Let me know below
                </TextStyled>
                <FormStyled action={formAction}>
                    <LabelStyled htmlFor="email">
                        Email:
                        <LabelDetailsStyled>
                            Optional. Will only be used if I have follow-up questions
                            about your suggestions.
                        </LabelDetailsStyled>
                    </LabelStyled>
                    <InputStyled
                        type="email"
                        id="email"
                        name="email"
                        placeholder="gary.bettman@nhl.com"
                    />
                    <LabelStyled htmlFor="feedback">Feedback:</LabelStyled>
                    <TextAreaStyled
                        id="feedback"
                        name="feedback"
                        placeholder="So I was thinking..."
                        required
                    />
                    <ButtonStyled type="submit" disabled={pending} aria-busy={pending}>
                        Submit
                    </ButtonStyled>
                </FormStyled>
            </FormAreaStyled>
        </FormPageStyled>
    );
};

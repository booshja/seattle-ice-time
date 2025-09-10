"use client";

import { useActionState } from "react";
import { createGithubIssue } from "@/actions";
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
import { FormLoading } from "../Loading";
import { IssueFormError } from "./Error";
import { IssueFormSuccess } from "./Success";
// import { render } from "@react-email/components";
// import { IssueEmail } from "@/components/Email";

export const IssueForm = () => {
    const initialFormActionState = { message: "" };

    // TODO: Figure out how to pass the email template to the server action
    // TODO:    but containing the form data
    // TODO:    Maybe just link to the issues page instead of including the details?
    // const emailHtml = render(<IssueEmail />);
    // createGithubIssue.bind(null, emailHtml);

    const [{ message }, formAction, pending] = useActionState(
        createGithubIssue,
        initialFormActionState,
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

    if (message === "Issue creation failed") {
        return (
            <FormPageStyled>
                <FormAreaStyled>
                    <IssueFormError />
                </FormAreaStyled>
            </FormPageStyled>
        );
    }

    if (message === "Issue created successfully") {
        return (
            <FormPageStyled>
                <FormAreaStyled>
                    <IssueFormSuccess />
                </FormAreaStyled>
            </FormPageStyled>
        );
    }

    return (
        <FormPageStyled>
            <FormAreaStyled>
                <HeaderStyled>Report an issue</HeaderStyled>
                <TextStyled>
                    Found a bug? Something not showing up like you expected? Let me know
                    so I can look into it
                </TextStyled>
                <FormStyled action={formAction}>
                    <LabelStyled htmlFor="title">
                        Title:
                        <LabelDetailsStyled>
                            A short headline of the issue
                        </LabelDetailsStyled>
                    </LabelStyled>
                    <InputStyled
                        type="text"
                        id="title"
                        name="title"
                        placeholder="The issue is..."
                        required
                    />
                    <LabelStyled htmlFor="email">
                        Email (optional):
                        <LabelDetailsStyled>
                            If you want a follow-up, leave your email
                        </LabelDetailsStyled>
                    </LabelStyled>
                    <InputStyled
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                    />
                    <LabelStyled htmlFor="description">
                        Description:
                        <LabelDetailsStyled>
                            To help me track down the issue, please include as much
                            detail about the issue you encountered as you can.
                        </LabelDetailsStyled>
                    </LabelStyled>
                    <TextAreaStyled
                        id="description"
                        name="description"
                        placeholder="This one time..."
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

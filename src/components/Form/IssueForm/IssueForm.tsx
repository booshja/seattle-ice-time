"use client";

// import { useState } from "react";
import {
    ButtonStyled,
    FormStyled,
    HeaderStyled,
    IssueFormStyled,
    IssuePageStyled,
    LabelDetailsStyled,
    LabelStyled,
    TextAreaStyled,
    TextStyled,
} from "./IssueFormStyled";

export const IssueForm = () => {
    // const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<boolean>(false);
    // const [success, setSuccess] = useState<boolean>(false);

    return (
        <IssuePageStyled>
            <IssueFormStyled>
                <HeaderStyled>Report an issue</HeaderStyled>
                <TextStyled>
                    Found a bug? Something not showing up like you expected? Let me know
                    so I can look into it
                </TextStyled>
                <FormStyled>
                    <LabelStyled htmlFor="description">
                        Description:
                        <LabelDetailsStyled>
                            To help me track down the issue, please include as much
                            detail about the issue you encountered as you can.
                        </LabelDetailsStyled>
                    </LabelStyled>
                    <TextAreaStyled id="description" name="description" required />
                    <ButtonStyled type="submit">Submit</ButtonStyled>
                </FormStyled>
            </IssueFormStyled>
        </IssuePageStyled>
    );
};

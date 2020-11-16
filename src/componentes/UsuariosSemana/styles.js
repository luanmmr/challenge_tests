import styled from 'styled-components';

export const IndicadorUsrSemana = styled.fieldset`
    display: flex;
    flex-direction: row;
    padding: 20px 20px;
    width: 400px;
    margin-top: 50px;

    label {
        margin: 5px 5px;
    }

    input {
        max-width: 50px;
        padding: 5px;
    }

    input[type="date"] {
        max-width: 150px;
    }

    input[type="number"] {
        font-size: 17px;
        padding-left: 20px;
        max-width: 40px;
    }

    label[for="number"] {
        margin-left: 20px;
    }
`;
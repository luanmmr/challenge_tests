import styled from 'styled-components';

export const IndicadorVndMesS = styled.fieldset`
    display: flex;
    flex-direction: row;
    padding: 20px 20px;
    width: 900px;
    margin-top: 20px;

    label {
        margin: 5px 5px;
    }

    input {
        max-width: 200px;
        padding: 5px;
    }

    label[for="status"] {
        margin-left: 20px;
    }

    input[type="number"] {
        font-size: 17px;
        padding-left: 20px;
        max-width: 90px;
    }

    label[for="qtd"] {
        margin-left: 20px;
    }

    label[for="comissao"] {
        margin-left: 20px;
    }
`;
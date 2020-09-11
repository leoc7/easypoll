import React, { useState, useRef } from 'react';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import * as Yup from 'yup';
import API from '../../services/api';
import { Container, ChoiceList, Choice } from './styles';
import { MdClose } from 'react-icons/md';

export default function PollCreate({ history }) {
    const [choices, setChoices] = useState([
        { id: 0, description: '' },
        { id: 1, description: '' },
    ]);
    const [choiceId, setChoiceId] = useState(2);

    const formRef = useRef(null);

    function addChoice() {
        setChoices([
            ...choices,
            {
                id: choiceId,
                description: '',
            },
        ]);
        setChoiceId(choiceId + 1);
    }

    function removeChoice(id) {
        if (choices.length == 2) return;
        setChoices(choices.filter(choice => choice.id !== id));
    }

    function handleChoiceChange(id, value) {
        setChoices(
            choices.map(choice => {
                if (choice.id == id) {
                    return { ...choice, description: value };
                }

                return choice;
            })
        );
    }

    async function handleSubmit(data) {
        const minChoices = [];
        choices.forEach(choice => minChoices.push(choice.description));

        try {
            const schema = Yup.object().shape({
                title: Yup.string()
                    .required('Digite o título da votação')
                    .max(255, 'O título é muito longo')
                    .min(6, 'O titulo é muito pequeno'),
                choices: Yup.array()
                    .min(2, 'Deve-se incluir no mínimo 2 alternativas')
                    .of(
                        Yup.string().required('A alternativa deve ser digitada')
                    ),
            });

            await schema.validate(
                { ...data, choices: minChoices },
                { abortEarly: false }
            );

            const parsedChoices = [];
            choices.forEach(choice =>
                parsedChoices.push({
                    description: choice.description,
                })
            );

            API.post('polls/', {
                title: data.title,
                choices,
            })
                .then(res => {
                    history.push('/');
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            const errors = {};
            err.inner.forEach(error => {
                errors[error.path] = error.message;
            });
            formRef.current.setErrors(errors);
        }
    }

    return (
        <Container>
            <h2>Nova votação</h2>
            <Form onSubmit={handleSubmit} ref={formRef}>
                <Input
                    name='title'
                    input={
                        <input type='text' placeholder='Título da Votação' />
                    }
                />

                <button type='button' className='dark' onClick={addChoice}>
                    Adicionar alternativa
                </button>
                <ChoiceList>
                    {choices.map((choice, index) => (
                        <Choice key={choice.id}>
                            <Input
                                name={`choices[${index}]`}
                                input={
                                    <input
                                        type='text'
                                        placeholder={`Alternativa # ${
                                            index + 1
                                        }`}
                                        onChange={e =>
                                            handleChoiceChange(
                                                choice.id,
                                                e.target.value
                                            )
                                        }
                                        defaultValue={choice.description}
                                    />
                                }
                            />
                            <button
                                type='button'
                                className='dark'
                                onClick={() => removeChoice(choice.id)}
                            >
                                <MdClose />
                            </button>
                        </Choice>
                    ))}
                </ChoiceList>

                <button type='submit'>Enviar</button>
            </Form>
        </Container>
    );
}

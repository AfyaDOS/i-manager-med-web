import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';
import { Input } from '../../components';

const ClientsRegister: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        cpf: Yup.number().min(11, 'CPF deve conter minimo de 11 digitos.').max(100, 'CPF deve conter maximo de 11 digitos.'),
        name: Yup.string().required('O nome é obrigatório !!'),
        phone: Yup.number().required('Ao menos um contato é obrigatório !!'),
        bloodtype: Yup.string().required('Tipo sangu´neo é obrigatório !!'),
        email: Yup.string().required('O nome é obrigatório !!'),
        address: Yup.object().shape({
          city: Yup.string().required('O nome é obrigatório !!'),
          state: Yup.string().required('O nome é obrigatório !!'),
          street: Yup.string().required('O nome é obrigatório !!'),
          district: Yup.string().required('O nome é obrigatório !!'),
          numberOf: Yup.number(),
          postcode: Yup.number().required('CEP é obrigatório !!'),
        }),
      });
      await schema.validate(data, { abortEarly: false });

      console.log(data);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          if (typeof error.path === 'string') {
            Object.assign(validationErrors, { [error.path]: error.message });
          }
        });
        if (typeof formRef?.current?.setErrors === 'function') {
          formRef.current.setErrors(validationErrors);
        }
      }
    }
  }, []);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Input label="CPF:" name="cpf" />
      <Input label="Nome completo:" name="name" />
      <Input label="Telefone:" name="phone" />
      <Input label="Email:" name="mail" />
      <Scope path="address">
        <Input label="CEP:" name="postcode" />
        <Input label="Cidade:" name="city" />
        <Input label="Estado:" name="state" />
        <Input label="Bairro:" name="district" />
        <Input label="Rua:" name="street" />
        <Input label="Número:" name="numberOf" />
      </Scope>
      <Input label="Tipo Sanguíneo:" name="bloodtype" />
      <button type="submit">enviar</button>
    </Form>
  );
};

export { ClientsRegister };

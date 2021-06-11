import React, { useState, useEffect } from 'react';
import {
  TextField,
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles,
  PrimaryButton,
} from '@fluentui/react';
import { consultarCep } from 'correios-brasil';
import api from '../../services';
import { Card, CardUser } from './styles';
import specialist from '../../assests/images/specialist.png';
import { Header } from '../../components/Header';

interface Address {
  postcode: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  siafi: string;
  uf: string;
}
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 800 } };
const SpecialistRegistry: React.FC = () => {
  const [options, setOptions] = useState<IComboBoxOption[]>([]);
  const comboBoxRef = React.useRef<IComboBox>(null);
  const [user, setUser] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [postcode, setPostcode] = useState<string | undefined>();
  const [street, setStreet] = useState<string | undefined>();
  const [state, setState] = useState<string | undefined>();
  const [district, setDistrict] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [numberOf, setNumberOf] = useState<string | undefined>();
  const [registry, setRegistry] = useState<string | undefined>();
  const [cell, setCell] = useState<string | undefined>();
  const [phone, setPhone] = useState<string | undefined>();
  const headers = {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0ZDIzZjhjLTczZjUtNDhiZC04NjliLWM5YmQ4M2Y4MGE0MSIsIm5hbWUiOiJtYXJjZWxvIiwiaWF0IjoxNjIzMTIwODUxLCJleHAiOjE2MjMyMDcyNTF9.UwFxvXyJtevb9csR14zSRhuIfI2mo5ScY5AsmqmNMuU',
  };

  useEffect(() => {
    api.get('/specialties', { headers }).then((res) => {
      setOptions(res.data);
    });
  }, []);

  useEffect(() => {
    // @ts-ignore
    consultarCep(postcode).then((response: Address) => {
      setStreet(response?.logradouro);
      setCity(response?.localidade);
      setState(response?.uf);
      setDistrict(response?.bairro);
    });
  }, [postcode]);

  // @ts-ignore
  const db: any[] = [];
  function specialties(value: any) {
    if (value?.selected === true) {
      db.push(value);
    }
  }

  function register() {
    api
      .post(
        '/specialist',
        {
          name: user,
          email,
          registry,
          phone,
          cell,
          specialties: db,
          address: {
            city,
            state,
            street,
            district,
            numberOf,
            postcode,
          },
        },
        { headers },
      )
      .then((res) => res.status);
  }

  return (
    <Card>
      <Header />
      <CardUser>
        <div className="title">
          <div>
            <img src={specialist} alt="logo especialista" className="logo" />
          </div>
          <div className="textCardHeader">
            <h1>Cadastro de Especialista</h1>
            <p>
              Para cadastrar, preencha os campos abaixo com os dados do
              especialista.
            </p>
          </div>
        </div>

        <div className="textColumn">
          <TextField
            onChange={(i, text) => setUser(text)}
            label="Name"
            placeholder="Ex: Marcelo"
            value={user}
          />

          <TextField
            onChange={(i, text) => setEmail(text)}
            label="E-mail"
            placeholder="Ex: marcelo@email.com"
            value={email}
          />

          <TextField
            onChange={(i, text) => setPostcode(text)}
            label="CEP"
            placeholder="Ex: 55555-555"
          />
          <TextField
            onChange={(i, text) => setStreet(text)}
            label="Endereço"
            placeholder="Ex: Rua Dr A"
            value={street}
          />
          <div className="city">
            <TextField
              onChange={(i, text) => setCity(text)}
              label="Cidade"
              placeholder="Ex: São Paulo"
              className="inputOne"
              value={city}
            />
            <TextField
              onChange={(i, text) => setState(text)}
              label="Estado"
              placeholder="Ex: SP"
              value={state}
            />
          </div>
          <div className="city">
            <TextField
              onChange={(i, text) => setDistrict(text)}
              label="Bairro"
              placeholder="Ex: Butantã"
              className="inputOne"
              value={district}
            />
            <TextField
              onChange={(i, text) => setNumberOf(text)}
              label="Número"
              placeholder="Ex: 80"
              value={numberOf}
            />
          </div>
        </div>

        <div className="separator" />

        <div className="textColumn">
          <TextField
            onChange={(i, text) => setPhone(text)}
            label="Telefone"
            placeholder="Ex: (88) 8888-8888 "
            value={phone}
          />
          <TextField
            onChange={(i, text) => setCell(text)}
            label="Celular"
            placeholder="Ex: (88) 88888-8888 "
            value={cell}
          />
          <TextField
            onChange={(i, text) => setRegistry(text)}
            label="Registro"
            placeholder="Ex: 8888888-88"
            value={registry}
          />
          <ComboBox
            componentRef={comboBoxRef}
            defaultSelectedKey="C"
            label="Especialidades"
            options={options}
            styles={comboBoxStyles}
            multiSelect
            // @ts-ignore
            onChange={(i, value) => specialties(value)}
          />

          <PrimaryButton className="button" onClick={register}>
            Cadastrar
          </PrimaryButton>
        </div>
      </CardUser>
    </Card>
  );
};

export { SpecialistRegistry };

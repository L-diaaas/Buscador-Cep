import React, { useState } from 'react';
import './BuscadorDeCEP.css';

function BuscadorDeCEP() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCep(value);
  };

  const buscarCep = async () => {
    if (cep.length !== 8) {
      setError('CEP inválido. Por favor, digite 8 números.');
      setEndereco(null);
      return;
    }
    setLoading(true);
    setError('');
    setEndereco(null);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setError('CEP não encontrado.');
        setEndereco(null);
      } else {
        setEndereco(data);
      }
    } catch (err) {
      setError('Ocorreu um erro ao buscar o CEP. Tente novamente.');
      setEndereco(null);
    } finally {
      setLoading(false);
    }
  };

  const limparBusca = () => {
    setCep(''); setEndereco(null); setError(''); setLoading(false);
  };

  return (
    <div className="container">
      <h1>Buscador de CEP</h1>
      <div className="input-container">
        <input type="text" value={cep} onChange={handleInputChange} placeholder="Digite o CEP (apenas números)" maxLength="8" className="cep-input" />
        <button onClick={buscarCep} className="btn-buscar" disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
        <button onClick={limparBusca} className="btn-limpar">Limpar</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {endereco && (
        <div className="endereco-container">
          <h2>Endereço Encontrado:</h2>
          <p><strong>CEP:</strong> {endereco.cep}</p>
          <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade:</strong> {endereco.localidade}</p>
          <p><strong>Estado:</strong> {endereco.uf}</p>
        </div>
      )}
    </div>
  );
}
export default BuscadorDeCEP;
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import * as SQLite from 'expo-sqlite';
import axios from "axios";

const db = SQLite.openDatabaseSync('api_data.db');

// Estrutura dos dados
interface ApiData {
  id: number;
  tipo: 'hgbrasil' | 'viacep';
  conteudo: string;
}

export default function ApiScreen() {
  const [data, setData] = useState<ApiData[]>([]);
  const [input, setInput] = useState("");
  const [tipo, setTipo] = useState<'hgbrasil' | 'viacep'>('hgbrasil');

  // Cria tabela no SQLite
  useEffect(() => {
    (async () => {
      await db.execAsync("CREATE TABLE IF NOT EXISTS api_data (id INTEGER PRIMARY KEY AUTOINCREMENT, tipo TEXT, conteudo TEXT);");
      fetchData();
    })();
  }, []);

  // Busca dados salvos
  const fetchData = async () => {
    try {
      const statement = await db.prepareAsync("SELECT * FROM api_data ORDER BY id DESC;");
      const result = await statement.executeAsync([]);
      const rows: ApiData[] = [];
      for await (const row of result) {
        rows.push(row as ApiData);
      }
      setData(rows);
      await statement.finalizeAsync();
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // Requisição para HgBrasil
  const fetchHgBrasil = async (): Promise<void> => {
    try {
      if (!input.trim()) {
        alert('Digite uma cidade para buscar o clima');
        return;
      }

      const API_KEY = 'd8265fb5'; // Sua chave de teste HgBrasil
      const cidade = input.trim();
      const response = await axios.get(`https://api.hgbrasil.com/weather?key=${API_KEY}&city_name=${cidade}`);
      
      const dadosFormatados = {
        cidade: response.data.results.city,
        temperatura: response.data.results.temp + '°C',
        descricao: response.data.results.description,
        data: response.data.results.date,
        hora: response.data.results.time,
        umidade: response.data.results.humidity + '%'
      };
      
      const conteudo = JSON.stringify(dadosFormatados);
      saveData('hgbrasil', conteudo);
      alert(`Dados do clima de ${response.data.results.city} salvos com sucesso!`);
    } catch (error: any) {
      console.error("Erro HgBrasil:", error);
      alert("Cidade não encontrada ou erro na API HgBrasil");
    }
  };

  // Requisição para ViaCEP
  const fetchViaCep = async (): Promise<void> => {
    if (!input.trim()) return;
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${input}/json/`);
      const conteudo = JSON.stringify(response.data);
      saveData('viacep', conteudo);
    } catch (error) {
      alert("Erro na API ViaCEP");
    }
  };

  // Salva no SQLite
  const saveData = async (tipo: 'hgbrasil' | 'viacep', conteudo: string) => {
    try {
      const statement = await db.prepareAsync("INSERT INTO api_data (tipo, conteudo) VALUES (?, ?);");
      await statement.executeAsync([tipo, conteudo]);
      await statement.finalizeAsync();
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  // Exclui registro
  const deleteData = async (id: number) => {
    try {
      const statement = await db.prepareAsync("DELETE FROM api_data WHERE id = ?;");
      await statement.executeAsync([id]);
      await statement.finalizeAsync();
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar dados:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔗 API SQLite Demo</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="CEP ou Cidade"
          value={input}
          onChangeText={setInput}
        />
        <Button title="ViaCEP" onPress={fetchViaCep} />
        <Button title="HgBrasil" onPress={fetchHgBrasil} />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item: ApiData) => item.id.toString()}
        renderItem={({ item }: { item: ApiData }) => (
          <View style={styles.item}>
            <Text style={{ fontWeight: 'bold' }}>{item.tipo}</Text>
            <Text numberOfLines={2}>{item.conteudo}</Text>
            <Button title="Excluir" onPress={() => deleteData(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 50 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  inputRow: { flexDirection: "row", marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, padding: 8, marginRight: 8 },
  item: { marginBottom: 10, padding: 8, borderWidth: 1, borderRadius: 4 },
});

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class DadosDaAPI {

    public String converteMoeda(String moeda1, String moeda2, Double valor) {
        // Monta a URL com as moedas e o valor
        String apiKey = "ef7277df487ebf3bae0012be";  // Substitua por sua chave da API
        URI url = URI.create(String.format("https://v6.exchangerate-api.com/v6/%s/pair/%s/%s/%.2f", apiKey, moeda1, moeda2, valor));
        HttpRequest request = HttpRequest.newBuilder().uri(url).build();

        try {
            // Faz a requisição HTTP para a API
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            // Faz o parsing da resposta JSON
            JsonObject jsonResponse = new Gson().fromJson(response.body(), JsonObject.class);

            // Verifica se a resposta tem os dados necessários
            if (jsonResponse.has("conversion_rate") && jsonResponse.has("conversion_result")) {
                double conversionRate = jsonResponse.get("conversion_rate").getAsDouble();
                double conversionResult = jsonResponse.get("conversion_result").getAsDouble();

                // Retorna a cotação e o valor convertido
                return String.format("A cotação atual é %.4f. O valor convertido é de %.2f %s.", conversionRate, conversionResult, moeda2);
            } else {
                return "Erro ao obter a conversão. Tente novamente.";
            }

        } catch (Exception e) {
            throw new RuntimeException("Erro na API: " + e.getMessage());
        }
    }
}

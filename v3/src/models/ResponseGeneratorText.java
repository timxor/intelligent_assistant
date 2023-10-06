/*

    This Java code provides a modular structure for generating responses 
    based on the output of the service execution. 
    The WeatherResponseGenerator is just one example, 
    and you can add more specific response generators as 
    needed for different services.

    https://chat.openai.com/c/9fd00b50-58c6-481e-87c4-d756f3a948dd

*/

public interface ResponseGenerator {
    String generateResponse(String serviceOutput);
}

class WeatherResponseGenerator implements ResponseGenerator {
    @Override
    public String generateResponse(String serviceOutput) {
        // For simplicity, we'll assume the serviceOutput is temperature in Celsius.
        if(serviceOutput == null || serviceOutput.isEmpty()) {
            return "I'm sorry, I couldn't fetch the weather information.";
        }
        return "The current temperature is " + serviceOutput + "°C.";
    }
}

class DefaultResponseGenerator implements ResponseGenerator {
    @Override
    public String generateResponse(String serviceOutput) {
        if(serviceOutput == null || serviceOutput.isEmpty()) {
            return "Your request was executed, but there's no specific output.";
        }
        return serviceOutput;
    }
}

public class ResponseFactory {
    private Map<String, ResponseGenerator> responseGenerators;

    public ResponseFactory() {
        responseGenerators = new HashMap<>();
        responseGenerators.put("weather", new WeatherResponseGenerator());
    }

    public String generateResponse(String serviceType, String serviceOutput) {
        ResponseGenerator generator = responseGenerators.getOrDefault(serviceType, new DefaultResponseGenerator());
        return generator.generateResponse(serviceOutput);
    }

    public static void main(String[] args) {
        ResponseFactory responseFactory = new ResponseFactory();
        
        // Test the response generator for weather
        String serviceOutput = "25";
        String response = responseFactory.generateResponse("weather", serviceOutput);
        System.out.println(response);
    }
}


#include <Random>

#define MAX 300
#define MIN 30

int frequency = 10;
float multiplier = 1.0f;
bool allow_data = false;
 
void setup()
{
  Serial.begin(9600);
}

void loop()
{
  if (Serial.available()) // needed when not using the Ardunino
  {
    serialEvent();
  }
  
  if (allow_data)
  {
    int final_reading = 0;

    for(int i = 0; i < frequency; i++)
    {
      final_reading += random(1024) * multiplier;
      delay(15);
    }

    final_reading /= frequency;

    Serial.println(final_reading);
  }
}

void serialEvent()
{
  String raw_input = Serial.readString();

  switch (raw_input[0])
  {
    case 'g': allow_data = true; break;
    case 'p': allow_data= false; break;
    case 'q': Serial.end(); break;
    default: Set_Config(raw_input);
  }
}

void Set_Config(String input)
{
  int index = 0;
  
  for (char i : input)
  {
    if (i == ',')
    {
      frequency = constrain(input.substring(0, index).toInt(), MIN, MAX);
      break;
    }
    index++;
  }
  
  multiplier = input.substring(index + 1, input.length()).toFloat();
}

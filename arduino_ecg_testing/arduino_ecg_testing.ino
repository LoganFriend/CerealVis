#include <Random>

#define MAX 300
#define BAUD 9600

int frequency = 10;
int max_reading = 1005;
byte multiplier = 1;
bool allow_data = false;
 
void setup()
{
  Serial.begin(BAUD);
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
      delay(50);
    }

    final_reading = constrain(final_reading / frequency, 0, max_reading);

    Serial.println(final_reading);
  }
}

void serialEvent()
{
  String raw_input = Serial.readString();

  int command_index = 0;
  for (char i : raw_input)
  {
    if (i == ' ')
    {
      break;
    }
    command_index++;
  }

  String command = raw_input.substring(0, command_index);

  if (command[0] == 'f')
  {
   frequency = Get_Value(raw_input, command_index + 1);
  }
  else if (command[0] == 'm')
  {
    multiplier = Get_Value(raw_input, command_index + 1);
  }
  else if (command[0] == 'x')
  {
    max_reading = Get_Value(raw_input, command_index + 1);
  }
  else if (command[0] == 'g')
  {
    data_gate();
  }
  else if (command[0] == 'q')
  {
    Serial.end();
  }
}

int Get_Value(String input, int index)
{
  return input.substring(index, input.length()).toInt();
}

void data_gate()
{
  allow_data = (allow_data) ? false : true;
}

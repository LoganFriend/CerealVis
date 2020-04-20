#define BAUD 9600
#define MAX 1024
int frequency = 10;
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
      final_reading += analogRead(A0);
      delay(2);
    }

    final_reading = constrain(final_reading / frequency, 0, MAX);

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
    default: break;
  }
}

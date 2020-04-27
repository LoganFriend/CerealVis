/*
  arduino_ecg_utility.ino

  This file is the code the arduino uses in production
  Data is read in based on users muscle movements. The number of data points
  read in at a time is based on the frequency set. The data is then averaged
  and sent back to the electron app.

  This file also listens for two basic character commands.
  'g' => short for "go" this command allows allows the arduino to start processing
         users muscle movements.
  'p' => short for "pause" this command prevents the arduino from processing users
         muscles movements.
*/

#define BAUD 9600
#define MAX 1024 // the largest number the arduino should be able to read
int frequency = 10; // the number of data points read in per loop
bool allow_data = false; // flag that allows data flow to happen
 
void setup()
{
  Serial.begin(BAUD);
}

// this loop is constantly call automatically (called for the first time after setup)
void loop()
{
  // this if statement is only needed when not using the arduino
  if (Serial.available()) 
  {
    serialEvent();
  }
  
  if (allow_data) // true when the 'g' command has been called and data flow is active
  {
    int final_reading = 0; // initializes the final reading to 0

    for (int i = 0; i < frequency; i++) // loops based on the number set for frequency
    {
      final_reading += analogRead(A0); // analongRead(A0) gets the data from the arduino's sensors
      delay(2); // a delay is added to ensure different data is read in
    }

    // this constrain function ensures that the number in the first parameter is between the
    // second and third function parameters. If it is not, final_reading's value is automatically
    // set to either 0 or MAX depending on which bounds flag it broke
    final_reading = constrain(final_reading / frequency, 0, MAX); // an average value is taken and constained

    Serial.println(final_reading); // the final_reading value is sent to the electron app
  }
}

// this function is automatically called when using the arduino or manually called when
// Serial.available() is true
void serialEvent()
{
  String raw_input = Serial.readString(); // reads the data send from the electron app to a string

  switch (raw_input[0]) // this switch case takes into account the first character of the raw_input string
  {
    case 'g': allow_data = true; break; // allows data flow
    case 'p': allow_data = false; break; // stops data flow
    default: break; // default case for erroneous data input 
  }
}

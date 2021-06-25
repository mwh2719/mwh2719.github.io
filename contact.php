<!DOCTYPE html>
               <html>
               <head>
                   <meta charset="utf-8" />
               </head>
    <body>
               

               <?php   
                echo "Thank you for filling out the contact form.";
                // ** Form validation code **
                // We will use the $_POST "super global" associative array to extract the values of the form fields
                // #1 - was the submit button pressed?
                if (isset($_POST['submit'])){ 
                    $to = 'mwh2719@rit.edu'; // !!! REPLACE WITH YOUR EMAIL !!!

                    // #2 - if a value for the `email` form field is missing, give a default value
                    // else, use the value from the form field
                        $from = empty(trim($_POST['contactEmail'])) ? "noemail@sample.com" : sanitize_string($_POST['contactEmail']);

                        $subject = $_POST['contactSubject'];

                        // #3 - same as above, except with the `message` form field
                        $message = empty(trim($_POST['contactMessage'])) ?  "No message" : sanitize_string($_POST['contactMessage']);

                        // #4 - same as above, except with the `name` form field
                        $name = empty(trim($_POST['contactName'])) ? "No name" : sanitize_string($_POST['contactName']);

                        $headers = "From: $from" . "\r\n";

                        // #6 - add the user's name to the end of the message
                        $message .= "\n\n - $name";



                            // #8 - mail returns false if the mail can't be sent
                            $sent = mail($to,$subject,$message,$headers);
                            if ($sent){
                                echo "<p><b>You sent:</b> $message</p>";
                            }else{
                                echo "<p>An error has occured. Mail not sent!</p>";
                            }

                }

                // #9 - this handy helper function is very necessary whenever
                // we are going to put user input onto a web page or a database
                // For example, if the user entered a <script> tag, and we added that <script> tag to our HTML page
                // they could perform an XSS attack (Cross-site scripting)
                function sanitize_string($string){
                $string = trim($string);
                $string = strip_tags($string);
                return $string;
                };
            ?>
                  <a href="index.html">Return to protfolio</a>
                   </body>   
</html>
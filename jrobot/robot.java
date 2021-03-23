import java.awt.*;
import java.awt.event.KeyEvent;
import java.io.IOException;

import java.util.*;

public class robot {
    public static void main(String args[]) throws IOException, AWTException, InterruptedException {
        Scanner sc = new Scanner(System.in);
        Robot robot = new Robot();
        System.out.println("Starting java file");
        while (true) {
            int s = sc.nextInt();
            System.out.println(Calendar.getInstance().getTimeInMillis());
            System.out.println(s);
            robot.keyPress(s);
            robot.keyRelease(s);
            System.out.println(Calendar.getInstance().getTimeInMillis());
        }
    }
}
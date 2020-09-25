package com.veille.technologique;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class DemoPage {

    /*
    @RequestMapping("/")
    public String home(HttpServletResponse httpResponse) throws IOException {
        httpResponse.sendRedirect("/login");
        return "redirect:/login";
    }
    */
    @GetMapping("/")
    public String home(){
        return ("<h1>Welcome everyone</h1>");
    }

    @GetMapping("/user")
    public String user(){
        return ("<h1>Welcome User</h1>");
    }

    @GetMapping("/admin")
    public String admin(){
        return ("<h1>Welcome Admin</h1>");
    }

    @GetMapping("/accessDenied")
    public String accessDenied(){
        return ("<body>\n" +
                "\t<h2>Sorry, you do not have permission to view this page.</h2>\n" +
                "\t \n" +
                "\tClick <a href=\"/\">here</a>\n" +
                "\tto go back to the Homepage.\n" +
                "\t</body>");
    }




}

---
title: "Notes From A Year Learning Programming: Ruby, Elixir, and JavaScript"
date: "2016-12-18T18:34:39.541Z"
layout: post
readNext: "/home-weather-display-project/"
path: "/notes-from-a-year-learning-programming/"
---
I spent the last year learning programming.  I talked about the different languages I learned and projects I worked on in my [last post](/a-year-learning-programming/).  This post contains my notes looking back on the year and a list of my favorite resources.  Enjoy!
## My Notes
This is a collection of notes I put together as I reflected back on the year.

### What language?
I didn’t realize it a year ago, but when you learn your first language, the language itself is the tip of the iceberg.  I think it is helpful to find a language with tutorials and books to learn beginner and intermediate programming fundamentals using the language as examples.   

I think Ruby is a good first language to learn because there are a ton of resources that will especially help you learn the non-language aspects of programming.  For example, how the web works ([Learn Rails Book One](http://learn-rails.com/)), testing/refactoring/programmer tools ([Upcase](https://thoughtbot.com/upcase/)) & design patterns (Practical Object Oriented Design in Ruby, i.e [POODR](http://www.poodr.com)), and development environment setup, Git & GitHub workflow, deployment, ([Ruby on Rails Tutorial](https://www.railstutorial.org/book)).

Ultimately, I wouldn’t worry a whole lot about picking a language.  If you want to switch, learning a 2nd language is much easier because you won’t be learning the fundamentals of programming at the same time.   

### Language or framework first?
I started learning both and picked whatever I found most enjoyable on that day.  I would bounce back and forth as sections got boring or if I felt like I was wading too far out in the framework “deep end” and didn’t understand what was going on.  It probably depends on if you learn better from the bottom up (learning the concepts in depth bit by bit) or top down (learn overall how everything fits together and then going back to learn the details).

### Type, Don’t Cut & Paste
It really helps me to type out the code rather than cut and pasting. Many people have said it, but it’s kind of like reading about skiing versus going to the mountain.  You aren’t going to get it until you get out on the slopes.  The same is true for actually typing code.  Get your fingers and mind used to typing the syntax.  However, sometimes I will just paste in the code if it's a topic I plan on coming back to.  For example, I skipped over the CSS in [Ruby on Rails Tutorial](https://www.railstutorial.org/book) the first time and just pasted it in.  I also skipped through JavaScript sections in [Programming Phoenix](https://pragprog.com/book/phoenix/programming-phoenix) my first time through.  I still read through those sections, but I knew I wasn’t getting a great understanding and made a mental note to go back when I wanted to really learn those areas. 

### Errors, Bugs, and Typos
Typing out all of the code helped me learn the lesson that 95% of my errors or bugs are typos.  On multiple occasions, when going through the [Ruby on Rails Tutorial](https://www.railstutorial.org/book) I had an error I couldn’t it figure out.  When I searched [StackOverflow](http://stackoverflow.com/), someone else had already posted the error...haha, we had the same typo.  It’s one benefit of having a bunch of people learning programming with the same language.

### Twice Through the Tutorial
The first time through a tutorial, I focus on understanding the big picture and often go through it twice. If I don’t get a concept, I just keep going and make a mental note to look for ways to better understand it during the rest of the book.  When I go back through the tutorial, I understand how things fit together, so it is easier for me to understand the more challenging topics. On many occasions, the concept I struggled with on the first time around makes sense once I understand how everything fits together.

### Find a Project
It was helpful for me to find a project once I finished a couple of tutorials (before I had a basic understanding, it was hard to know what was reasonable to build when starting out.) The main project I picked was building the fantasy sports app. As I mentioned above, I built it 3 times. Picking the next thing to learn was easier because it was based on the next feature I was trying to add to my app. Having a project also created the right amount of stress and urgency for me to break through barriers and not give up as I was learning.

### Intermediate Learning Without Becoming Overwhelmed
There is a ton to learn and it can be overwhelming.  [Justin Weiss](http://www.justinweiss.com/) gives a lot of great advice about learning Rails as an intermediate, e.g. "[With So Much Rails to Learn, Where Do You Start?](https://www.justinweiss.com/articles/with-so-much-rails-to-learn/)".  The most important thing I learned from him is the importance of your setting aside the things you plan to learn later.  I always have a large list of things I am setting aside so I can focus on learning one or two things in depth.   

### Borrowing Code for Your Project
There were many opportunities to take pieces of tutorials and modify them to fit my project.  One advantage of going through multiple tutorials is that I had a bunch of patterns and ideas for how to solve problems when you will run into them in your project.  For example, I used the Wes Bos [Learn Redux](https://learnredux.com/) tutorial app Reduxtagram to model [MetroApp](https://github.com/WojoSite/metroApp).  For one of my next features to add to MetroApp, I plan on using the implementation of the FilteredTodo from the Redux docs [Todo List tutorial](http://redux.js.org/docs/basics/ExampleTodoList.html) to add a filter by rail line color for the list of metro stations.

### StackOverflow and Documentation
StackOverflow can help you find something when you don’t know what you are looking for.  However, the more I’ve learned, the more useful the docs have become.  Part of that may be because Elixir has great docs and there isn’t as much info on Stack Overflow.  The [Elixir Forum](https://elixirforum.com/) is a great resource if you run into problems with Elixir...pretty cool when the creator of the language [answers your question himself](https://elixirforum.com/t/data-confirm-and-data-disable-in-forms/1633/3).

### Watch the Pros
One of my favorite part of screencasts was learning that even the pros make typos and other mistakes. They also have to reference the docs and look stuff up just like us regular folks.

### Reading Open Source
I’ve tried to read more open source code, but I found that libraries were tough to understand at first. I joined [Upcase](https://thoughtbot.com/upcase/practice) which is a learning site from [Thoughtbot](https://thoughtbot.com/) and I think the best thing about it is access to the Upcase repository. The structure generally mirrored my app, so I could see how they solved problems similar to problems I faced. Now that I’m more experienced, I’ve found libraries useful for style and understanding how people organize classes/methods, and modules/functions. Reading more open source code is something I plan to work on in 2017.

### Taking a Break
When I hit a roadblock and I start forcing a solution, I learned that it is best to step away from the problem. So many times I’ve struggled for an hour or two and then the next morning I see the problem in 5 or 10 minutes. This is a tough one because it feels like you’re right on the edge of figuring it out…if I just play around with it for a few more minutes! …nope, time to take a break.

### Pairing and Finding a Mentor
Another one of my goals for 2017 is to look into remote pairing and maybe learn more “in person” from a more experienced programmer. I feel like many of the authors of the books I’ve used are my unofficial mentors, but seeing how experienced programmers work would probably help me learn more quickly.

## List of My Favorite Resources
Many books and tutorials are available online for free, but if I find them useful, I buy a copy to support the author.

### General
* [Code School](https://www.codeschool.com/):  A good introduction to [HTML](http://www.w3schools.com/html/), [CSS](http://www.w3schools.com/css/), and [JavaScript](https://www.javascript.com/).  The courses made it easy to get started when I was brand new. 
* [Imposter’s Handbook](https://bigmachine.io/products/the-imposters-handbook/) by Rob Conery ([@robconery](https://twitter.com/robconery)):  If you really get into programming, this book will give you an introduction to many computer science topics.
### Ruby/Rails
#### Beginner
* [Learn Ruby the Hard Way](https://learnrubythehardway.org/book/) by Zed A. Shaw ([@lzsthw](https://twitter.com/lzsthw)):  A great introduction to programming in Ruby.
* [Learn Rails](http://learn-rails.com/) by Daniel Kehoe ([@rails_apps](https://twitter.com/rails_apps)):  Book 1 is the best introduction I found about how the web works.
* [Ruby on Rails Tutorial](https://www.railstutorial.org/book) by Michael Hartl ([@mhartl](https://twitter.com/mhartl)):  Without question my favorite tutorial. It teaches you important fundamentals of software development and the explanations are excellent.  Also check out his [Learn Enough series](https://www.learnenough.com/).
* [Rails Guides](http://guides.rubyonrails.org/):  These guides are really helpful and I refer to them all the time when I’m working in Rails.
#### Intermediate
* [Practicing Rails](https://www.justinweiss.com/practicing-rails/) by Justin Weiss ([@justinweiss](https://twitter.com/justinweiss)):  An excellent guide for learning intermediate concepts once you get the basics.
* [Upcase](https://thoughtbot.com/upcase/):  An amazing resource for not just Rails, but all kinds of software development tools and best practices.  Convinced me to learn VIM and now I’m hooked!
* [Thoughtbot Guides](https://github.com/thoughtbot/guides):  A bunch of real world guides for software development.  I use their [Git Protocol guide](https://github.com/thoughtbot/guides/tree/master/protocol/git) every time I’m committing changes to my master branch (i.e. saving my changes).
* [Practical Object-Oriented Design in Ruby](http://www.poodr.com/) by Sandi Metz ([@sandimetz](https://twitter.com/sandimetz)):  Once you have a basic understanding of the language and have some experience, this is a good book to introduce design patterns.  Here is where learning Ruby is helpful.  You can learn the design patterns in a language you understand.
* [Bike Shed](http://bikeshed.fm/) with Sean Griffin ([@sgrif](https://twitter.com/sgrif)) and Derek Prior ([@derekprior](https://twitter.com/derekprior)):  An excellent podcast to become familiar with programming terms and concepts.  The episode [You’re an Elixir Developer Now](http://bikeshed.fm/52) convinced me to learn Elixir and Phoenix and build my app a third time.
* [Giant Robots](https://twitter.com/giantrobots) with Ben Orenstein ([@r00k](https://twitter.com/r00k)):  A fun mix of business, self-development, and programming.
### Elixir/Phoenix
#### Beginner/Intermediate
* [Elixir Guides](http://elixir-lang.org/getting-started/introduction.html):  A great starting point if you are interested in Elixir. 
* [Phoenix Guides](http://www.phoenixframework.org/docs/overview):  Get an overview of Phoenix.
* [Taking Off With Elixir](https://bigmachine.io/products/take-off-with-elixir/) by Rob Conery ([@robconery](https://twitter.com/robconery)):  A fun tutorial built into a story.  The exercises were the best resource I found to understand pattern matching.
* [Programming Elixir](https://pragprog.com/book/elixir/programming-elixir) by Dave Thomas ([@pragdave](https://twitter.com/pragdave)):  The best tutorial for learning the basics of Elixir.
* [Programming Phoenix](https://pragprog.com/book/phoenix/programming-phoenix) by Bruce Tate ([@redrapids](https://twitter.com/redrapids)), Chris McCord ([@chris_mccord](https://twitter.com/chris_mccord)) and José Valim ([@josevalim](https://twitter.com/josevalim)):  The resource for learning Phoenix.  Looking forward to the update for Phoenix 1.3.
* [Elixir in Action](https://www.manning.com/books/elixir-in-action) by Saša Jurić ([@sasajuric](https://twitter.com/sasajuric)):  I found it was the best resource to learn OTP in Elixir.
* [Elixir Forum](https://elixirforum.com/):  I would use this over StackOverflow for Elixir/Phoenix questions.  The community is very helpful.
* [Daily Drip](https://www.dailydrip.com/topics/elixir) by Josh Adams ([@knewter](https://twitter.com/knewter)):  A series of short screencasts for learning Elixir topics.
* [Elixir Fountain](https://soundcloud.com/elixirfountain) with Johnny Winn ([@johnny_rugger](https://twitter.com/johnny_rugger)):  A fun podcast to hear from the people in the Elixir community.
### JavaScript/React/Redux:
#### Beginner
* [A Smarter Way to Learn JavaScript](https://www.amazon.com/Smarter-Way-Learn-JavaScript-technology-ebook/dp/B00H1W9I6C):  Make sure you actually do the exercises. I could tell I was getting it when I could go through the exercises without consciously thinking about them. 
#### Intermediate
* [You Don’t Know JavaScript](https://github.com/getify/You-Dont-Know-JS) by Kyle Simpson([@getify](https://twitter.com/getify)):  Excellent resource, but gets down in the weeds.  I go back to it to learn concepts when I want to get a more in depth understanding.
* [React Tutorial](https://facebook.github.io/react/tutorial/tutorial.html) and [Redux Tutorial](http://redux.js.org/) by Dan Abramov([@dan_abramov](https://twitter.com/dan_abramov)):  Very good introduction to these libraries.
* [ReactJS Redux, the Right Way](https://reactjs.co/#basic-preface):  This site has an excellent path for learning React & Redux.  
* [Learn Redux](https://learnredux.com/) by Wes Bos ([@wesbos](https://twitter.com/wesbos)):  A good series of screencasts.

These are my favorites, but there are many other great resources I haven't listed here.  Thanks for reading!

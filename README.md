Elm Console [![Build Status]][travis]
=========
This library allows reading and writing from the console in Node.
It is a replacement for [`maxsnew/IO`], which is no longer updated.

Example
-------
An elm Program:
```elm
module Main where

import Console exposing (IO, (>>>), (>>=), forever, getLine, pure, exit, putStrLn)
import Task

import List
import Maybe
import String

echo : IO ()
echo = forever (getLine >>= putStrLn)

loop : IO ()
loop = getLine >>= \s ->
       if s == "exit"
       then pure ()
       else putStrLn s >>> loop

hello : IO ()
hello = putStrLn "Hello, Console!" >>>
        putStrLn "I'll echo your input until you say \"exit\":" >>>
        loop >>>
        putStrLn "That's all, folks!" >>>
        exit 0

port runner : Signal (Task.Task x ())
port runner = Console.run hello
```

link in some javascript and then run:
```console
$ elm-make --yes test/Test.elm raw-test.js
...
$ ./elm-io.sh raw-test.js test.js
$ node test.js
Hello, Console!
I'll echo your input:
hooray
hooray
That's all, folks!
```

<br>

How to contribute
-----------
Please fork this repo and send Pull Requests!

```bash
# Install dependencies including Elm runtime
yarn
# Perform tests
yarn test

# Open Elm REPL
yarn elm-repl
# Generator documentation.json
yarn elm-make -- --docs documentation.json
```

Design and Implementation
-------------------------
The implementation is based on the [IOSpec] haskell library.

<br>

--------

[BSD 3-Clause License](LICENSE)

[Build Status]: https://travis-ci.org/openirc/elm-console.svg?branch=master
[travis]: https://travis-ci.org/openirc/elm-console
[`maxsnew/IO`]: https://github.com/maxsnew/IO
[IOSpec]: http://hackage.haskell.org/package/IOSpec

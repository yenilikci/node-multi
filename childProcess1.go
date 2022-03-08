package main

import (
	"fmt"
	"os"
)

func main() {
	arg := os.Args[1]
	fmt.Print("output from go, author: ", arg)
}

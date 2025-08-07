process.stdin.setEncoding("utf-8");

process.stdin.on("data", (input) => {
    input = input.trim(); 
    if (input === "securedPassword123") {
        console.log("Access granted!");
        process.exit();
    } else {
        process.stdout.write("Try Again\n");
    }
});
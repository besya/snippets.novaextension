const CompletionProvider = require('CompletionProvider.js');

exports.activate = function() {
    console.log("Activating Snippets Extension");
    // Do work when the extension is activated
}

exports.deactivate = function() {
    // Clean up state before the extension is deactivated
}

const config_prefix = "besya.snippets.";

let registered = {};

const languages = [
    "c", "cpp", "csharp", "css", "elixir", "erlang", "gleam", "go", "haskell",
    "java", "javascript", "lua", "markdown", "nix", "perl", "php", "python", "r", "ruby",
    "rust", "shell", "sql", "svelte", "swift", "typescript", "zig"
]

for (let language of languages) {
    let key = config_prefix + language;
    registered[key] = null;
    nova.config.observe(key, function (currentValue) {
        if (currentValue == false && registered[key] !== null) {
            // console.log("Dispose: " + key);
            registered[key].dispose();
            delete(registered[key]);
            registered[key] = null;
        } else if (currentValue === true && registered[key] === null) {
            // console.log("Register: " + key);
            registered[key] = nova.assistants.registerCompletionAssistant(language, new CompletionProvider(language));
        }
    });
}

const django_key = config_prefix + "django";
registered[django_key] = null;
nova.config.observe(django_key, function (currentValue) {
    if (currentValue == false && registered[django_key] !== null) {
        // console.log("Dispose: " + django_key);
        registered[django_key].dispose();
        delete(registered[django_key]);
        registered[django_key] = null;
    } else if (currentValue === true && registered[django_key] === null) {
        // console.log("Register: " + django_key);
        registered[django_key] = nova.assistants.registerCompletionAssistant("python", new CompletionProvider("django"));
    }
});


const rails_key = config_prefix + "rails";
registered[rails_key] = null;
nova.config.observe(rails_key, function (currentValue) {
    if (currentValue == false && registered[rails_key] !== null) {
        // console.log("Dispose: " + rails_key);
        registered[rails_key].dispose();
        delete(registered[rails_key]);
        registered[rails_key] = null;
    } else if (currentValue === true && registered[rails_key] === null) {
        // console.log("Register: " + rails_key);
        registered[rails_key] = nova.assistants.registerCompletionAssistant("ruby", new CompletionProvider("rails"));
    }
});

docker_key = config_prefix + "docker";
registered[docker_key] = null;
nova.config.observe(docker_key, function (currentValue) {
    if (currentValue == false && registered[docker_key] !== null) {
        // console.log("Dispose: " + docker_key);
        registered[docker_key].dispose();
        delete(registered[docker_key]);
        registered[docker_key] = null;
    } else if (currentValue === true && registered[docker_key] === null) {
        // console.log("Register: " + docker_key);
        registered[docker_key] = nova.assistants.registerCompletionAssistant("dockerfile", new CompletionProvider("docker"));
    }
});



const html_key = config_prefix + "html";
const html_eex_key = config_prefix + "html+eex";
const html_erb_key = config_prefix + "html+erb";
registered[html_key] = null;
registered[html_eex_key] = null;
registered[html_erb_key] = null;
nova.config.observe(html_key, function (currentValue) {
    if (currentValue == false && registered[html_key] !== null) {
        // console.log("Dispose: " + html_key);
        registered[html_key].dispose();
        delete(registered[html_key]);
        registered[html_key] = null;

        // console.log("Dispose: " + html_erb_key);
        registered[html_erb_key].dispose();
        delete(registered[html_erb_key]);
        registered[html_erb_key] = null;

        // console.log("Dispose: " + html_erb_key);
        registered[html_eex_key].dispose();
        delete(registered[html_eex_key]);
        registered[html_eex_key] = null;
    } else if (currentValue === true && registered[html_key] === null) {
        // console.log("Register: " + html_key);
        registered[html_key] = nova.assistants.registerCompletionAssistant("html", new CompletionProvider("html"));

        // console.log("Register: " + html_erb_key);
        registered[html_erb_key] = nova.assistants.registerCompletionAssistant("html+erb", new CompletionProvider("html"));

        // console.log("Register: " + html_eex_key);
        registered[html_eex_key] = nova.assistants.registerCompletionAssistant("html+eex", new CompletionProvider("html"));
    }
});


const eex_key = config_prefix + "eex";
registered[eex_key] = null;
nova.config.observe(eex_key, function (currentValue) {
    if (currentValue == false && registered[eex_key] !== null) {
        // console.log("Dispose: " + eex_key);
        registered[eex_key].dispose();
        delete(registered[eex_key]);
        registered[eex_key] = null;
    } else if (currentValue === true && registered[eex_key] === null) {
        // console.log("Register: " + eex_key);
        registered[eex_key] = nova.assistants.registerCompletionAssistant("html+eex", new CompletionProvider("eex"));
    }
});

erb_key = config_prefix + "erb";
registered[erb_key] = null;
nova.config.observe(erb_key, function (currentValue) {
    if (currentValue == false && registered[erb_key] !== null) {
        // console.log("Dispose: " + erb_key);
        registered[erb_key].dispose();
        delete(registered[erb_key]);
        registered[erb_key] = null;
    } else if (currentValue === true && registered[erb_key] === null) {
        // console.log("Register: " + erb_key);
        registered[erb_key] = nova.assistants.registerCompletionAssistant("html+erb", new CompletionProvider("erb"));
    }
});

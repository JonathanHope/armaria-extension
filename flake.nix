{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, flake-compat }:
    let pkgs = import nixpkgs {
      system = "x86_64-linux";
    };
    in
    {
      devShell.x86_64-linux =
        pkgs.mkShell {
          buildInputs = with pkgs;[
            nodejs_20
            jq
          ];
          shellHook = ''
            export PATH=$PWD/tools:$PATH
          '';
        };
    };
}

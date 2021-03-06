// Generated by CoffeeScript 1.4.0
(function() {
  var compiler, minCode, syspath, uglifycss, ujs, utils;

  syspath = require('path');

  compiler = require("../compiler/compiler");

  utils = require("../util");

  uglifycss = require("uglifycss");

  ujs = require("uglify-js");

  exports.get_dist_filename = function(srcpath) {
    var ext, t, _basename, _extname;
    t = compiler.getContentType(srcpath);
    switch (t.toLowerCase()) {
      case "javascript":
        ext = ".js";
        break;
      case "css":
        ext = ".css";
    }
    _extname = utils.path.extname(srcpath);
    _basename = utils.path.basename(srcpath, _extname);
    return _basename + ext;
  };

  exports.minCode = minCode = function(extname, source, options, fekitconfig) {
    var BeautifierOptions, CompressorOptions, compressed_ast, compressor, final_code, stream, toplevel, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
    if (options == null) {
      options = {};
    }
    if (fekitconfig == null) {
      fekitconfig = {};
    }
    if (options.nopack) {
      return source;
    }
    switch (extname) {
      case ".css":
        if (options.noSplitCSS) {
          final_code = uglifycss.processString(source, fekitconfig != null ? (_ref = fekitconfig.min) != null ? (_ref1 = _ref.config) != null ? _ref1.uglifycss : void 0 : void 0 : void 0);
        } else {
          final_code = uglifycss.processString(source, fekitconfig != null ? (_ref2 = fekitconfig.min) != null ? (_ref3 = _ref2.config) != null ? _ref3.uglifycss : void 0 : void 0 : void 0).replace(/}/g, "}\n");
        }
        break;
      case ".js":
        toplevel = ujs.parse(source);
        toplevel.figure_out_scope();
        CompressorOptions = (fekitconfig != null ? (_ref4 = fekitconfig.min) != null ? (_ref5 = _ref4.config) != null ? (_ref6 = _ref5.uglifyjs) != null ? _ref6.compressor : void 0 : void 0 : void 0 : void 0) || {
          drop_console: true,
          drop_debugger: true,
          warnings: false
        };
        compressor = ujs.Compressor(CompressorOptions);
        compressed_ast = toplevel.transform(compressor);
        compressed_ast.figure_out_scope();
        compressed_ast.compute_char_frequency();
        compressed_ast.mangle_names();
        BeautifierOptions = (fekitconfig != null ? (_ref7 = fekitconfig.min) != null ? (_ref8 = _ref7.config) != null ? (_ref9 = _ref8.uglifyjs) != null ? _ref9.beautifier : void 0 : void 0 : void 0 : void 0) || {};
        stream = ujs.OutputStream(BeautifierOptions);
        compressed_ast.print(stream);
        final_code = stream.toString();
    }
    return final_code;
  };

}).call(this);

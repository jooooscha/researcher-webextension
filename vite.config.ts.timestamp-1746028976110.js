// vite.config.ts
import { dirname, relative } from "path";
import preact from "@preact/preset-vite";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// scripts/utils.ts
import { resolve } from "path";
import { bgCyan, black } from "kolorist";
var port = parseInt(process.env.PORT || "", 10) || 3303;
var r = (...args) => resolve("/home/joscha/main/programming/researcher-webextension/scripts", "..", ...args);
var isDev = process.env.NODE_ENV !== "production";

// vite.config.ts
var sharedConfig = {
  root: r("src"),
  resolve: {
    alias: {
      "src/": `${r("src")}/`
    }
  },
  define: {
    __DEV__: isDev
  },
  plugins: [
    preact(),
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`.replace(/\\/g, "/")
        );
      }
    }
  ],
  optimizeDeps: {
    include: ["preact", "webextension-polyfill"]
  }
};
var vite_config_default = defineConfig(({ command }) => {
  return {
    ...sharedConfig,
    base: command === "serve" ? `http://localhost:${port}/` : void 0,
    server: {
      port,
      hmr: {
        host: "localhost"
      }
    },
    build: {
      outDir: r("extension/dist"),
      emptyOutDir: false,
      sourcemap: isDev ? "inline" : false,
      terserOptions: {
        mangle: false
      },
      cssCodeSplit: false,
      minify: "terser",
      brotliSize: false,
      rollupOptions: {
        input: {
          app: r("src/views/app/index.html"),
          popup: r("src/views/popup/index.html")
        },
        output: {
          manualChunks: {
            "mui-for-popup": [
              "@mui/material/Checkbox",
              "@mui/material/Rating",
              "@mui/material/Box",
              "@mui/material/Button",
              "@mui/material/CssBaseline",
              "@mui/material/Alert",
              "@mui/material/AlertTitle",
              "@mui/material/AppBar",
              "@mui/material/Button",
              "@mui/material/Toolbar",
              "@mui/material/Typography",
              "@mui/material/CircularProgress"
            ]
          }
        },
        plugins: [
          visualizer({
            filename: "build/stats.html",
            gzipSize: true,
            brotliSize: true
          })
        ]
      }
    },
    plugins: [...sharedConfig.plugins]
  };
});
export {
  vite_config_default as default,
  sharedConfig
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy91dGlscy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlcyAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuaW1wb3J0IHsgZGlybmFtZSwgcmVsYXRpdmUgfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IHByZWFjdCBmcm9tICdAcHJlYWN0L3ByZXNldC12aXRlJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbi8vIGltcG9ydCBjb3B5IGZyb20gJ3JvbGx1cC1wbHVnaW4tY29weSc7XG5cbmltcG9ydCB7IGlzRGV2LCBwb3J0LCByIH0gZnJvbSAnLi9zY3JpcHRzL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IHNoYXJlZENvbmZpZzogVXNlckNvbmZpZyA9IHtcbiAgcm9vdDogcignc3JjJyksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ3NyYy8nOiBgJHtyKCdzcmMnKX0vYCxcbiAgICB9LFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBfX0RFVl9fOiBpc0RldixcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIC8vICEgcHJlYWN0IGh0dHBzOi8vZ2l0aHViLmNvbS9wcmVhY3Rqcy9wcmVzZXQtdml0ZVxuICAgIHByZWFjdCgpLFxuICAgIC8vICEgcmV3cml0ZSBhc3NldHMgdG8gdXNlIHJlbGF0aXZlIHBhdGhcbiAgICB7XG4gICAgICBuYW1lOiAnYXNzZXRzLXJld3JpdGUnLFxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCwgeyBwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShcbiAgICAgICAgICAvXCJcXC9hc3NldHNcXC8vZyxcbiAgICAgICAgICBgXCIke3JlbGF0aXZlKGRpcm5hbWUocGF0aCksICcvYXNzZXRzJyl9L2AucmVwbGFjZSgvXFxcXC9nLCAnLycpLCAvLyAhIHJlcGxhY2UgYmFja3NsYXNoIHRvIHNsYXNoXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsncHJlYWN0JywgJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCddLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnNoYXJlZENvbmZpZyxcbiAgICBiYXNlOiBjb21tYW5kID09PSAnc2VydmUnID8gYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fS9gIDogdW5kZWZpbmVkLFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydCxcbiAgICAgIGhtcjoge1xuICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiByKCdleHRlbnNpb24vZGlzdCcpLFxuICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuICAgICAgc291cmNlbWFwOiBpc0RldiA/ICdpbmxpbmUnIDogZmFsc2UsXG4gICAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAgIG1hbmdsZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY3NzQ29kZVNwbGl0OiBmYWxzZSwgLy8gISBJZiBmYWxzZSwgYWxsIENTUyBpbiB0aGUgZW50aXJlIHByb2plY3Qgd2lsbCBiZSBleHRyYWN0ZWQgaW50byBhIHNpbmdsZSBDU1MgZmlsZS5cbiAgICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgICBicm90bGlTaXplOiBmYWxzZSwgLy8gISBjb21wcmVzc2lvbiBzaXplIHJlcG9ydFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgIGFwcDogcignc3JjL3ZpZXdzL2FwcC9pbmRleC5odG1sJyksXG4gICAgICAgICAgcG9wdXA6IHIoJ3NyYy92aWV3cy9wb3B1cC9pbmRleC5odG1sJyksXG4gICAgICAgICAgLy8gYmFja2dyb3VuZDogcignc3JjL3ZpZXdzL2JhY2tncm91bmQvaW5kZXguaHRtbCcpLFxuICAgICAgICAgIC8vIG9wdGlvbnM6IHIoJ3NyYy92aWV3cy9vcHRpb25zL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgICAvLyBuZXdUYWI6IHIoJ3NyYy92aWV3cy9uZXctdGFiL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICAvLyAhIG1hbnVhbGx5IGJ1bmRsZSBAbXVpIGZvciBQb3B1cCB0byByZWR1Y2Ugc2l6ZVxuICAgICAgICAgICAgJ211aS1mb3ItcG9wdXAnOiBbXG4gICAgICAgICAgICAgICdAbXVpL21hdGVyaWFsL0NoZWNrYm94JyxcbiAgICAgICAgICAgICAgJ0BtdWkvbWF0ZXJpYWwvUmF0aW5nJyxcbiAgICAgICAgICAgICAgJ0BtdWkvbWF0ZXJpYWwvQm94JyxcbiAgICAgICAgICAgICAgJ0BtdWkvbWF0ZXJpYWwvQnV0dG9uJyxcbiAgICAgICAgICAgICAgJ0BtdWkvbWF0ZXJpYWwvQ3NzQmFzZWxpbmUnLFxuICAgICAgICAgICAgICAnQG11aS9tYXRlcmlhbC9BbGVydCcsXG4gICAgICAgICAgICAgICdAbXVpL21hdGVyaWFsL0FsZXJ0VGl0bGUnLFxuICAgICAgICAgICAgICAnQG11aS9tYXRlcmlhbC9BcHBCYXInLFxuICAgICAgICAgICAgICAnQG11aS9tYXRlcmlhbC9CdXR0b24nLFxuICAgICAgICAgICAgICAnQG11aS9tYXRlcmlhbC9Ub29sYmFyJyxcbiAgICAgICAgICAgICAgJ0BtdWkvbWF0ZXJpYWwvVHlwb2dyYXBoeScsXG4gICAgICAgICAgICAgICdAbXVpL21hdGVyaWFsL0NpcmN1bGFyUHJvZ3Jlc3MnLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgdmlzdWFsaXplcih7XG4gICAgICAgICAgICBmaWxlbmFtZTogJ2J1aWxkL3N0YXRzLmh0bWwnLFxuICAgICAgICAgICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICAgICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFsuLi5zaGFyZWRDb25maWcucGx1Z2lucyFdLFxuICB9O1xufSk7XG5cbi8vIGNvcHkoe1xuLy8gICB0YXJnZXRzOiBbXG4vLyAgICAge1xuLy8gICAgICAgc3JjOiBbJy4vbm9kZV9tb2R1bGVzL0Btb3ppbGxhL3JlYWRhYmlsaXR5J10sXG4vLyAgICAgICBkZXN0OiAnLi9leHRlbnNpb24vZGlzdC8nLFxuLy8gICAgIH0sXG4vLyAgIF0sXG4vLyAgIHZlcmJvc2U6IHRydWUsXG4vLyAgIGNvcHlPbmNlOiB0cnVlLFxuLy8gICBob29rOiAnd3JpdGVCdW5kbGUnLFxuLy8gfSksXG4iLCAiaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyBiZ0N5YW4sIGJsYWNrIH0gZnJvbSAna29sb3Jpc3QnO1xuXG5leHBvcnQgY29uc3QgcG9ydCA9IHBhcnNlSW50KHByb2Nlc3MuZW52LlBPUlQgfHwgJycsIDEwKSB8fCAzMzAzO1xuZXhwb3J0IGNvbnN0IHIgPSAoLi4uYXJnczogc3RyaW5nW10pOiBzdHJpbmcgPT4gcmVzb2x2ZShcIi9ob21lL2pvc2NoYS9tYWluL3Byb2dyYW1taW5nL3Jlc2VhcmNoZXItd2ViZXh0ZW5zaW9uL3NjcmlwdHNcIiwgJy4uJywgLi4uYXJncyk7XG5leHBvcnQgY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9nKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUubG9nKGJsYWNrKGJnQ3lhbihgICR7bmFtZX0gYCkpLCBtZXNzYWdlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLFNBQVMsZ0JBQWdCO0FBRWxDLE9BQU8sWUFBWTtBQUNuQixTQUFTLGtCQUFrQjtBQUUzQixTQUFTLG9CQUFvQjs7O0FDUDdCLFNBQVMsZUFBZTtBQUV4QixTQUFTLFFBQVEsYUFBYTtBQUV2QixJQUFNLE9BQU8sU0FBUyxRQUFRLElBQUksUUFBUSxJQUFJLEVBQUUsS0FBSztBQUNyRCxJQUFNLElBQUksSUFBSSxTQUEyQixRQUFRLGlFQUFpRSxNQUFNLEdBQUcsSUFBSTtBQUMvSCxJQUFNLFFBQVEsUUFBUSxJQUFJLGFBQWE7OztBRE12QyxJQUFNLGVBQTJCO0FBQUEsRUFDdEMsTUFBTSxFQUFFLEtBQUs7QUFBQSxFQUNiLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVEsR0FBRyxFQUFFLEtBQUs7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFFUCxPQUFPO0FBQUEsSUFFUDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsbUJBQW1CLE1BQU0sRUFBRSxLQUFLLEdBQUc7QUFDakMsZUFBTyxLQUFLO0FBQUEsVUFDVjtBQUFBLFVBQ0EsSUFBSSxTQUFTLFFBQVEsSUFBSSxHQUFHLFNBQVMsS0FBSyxRQUFRLE9BQU8sR0FBRztBQUFBLFFBQzlEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsVUFBVSx1QkFBdUI7QUFBQSxFQUM3QztBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxRQUFRLE1BQU07QUFDM0MsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsTUFBTSxZQUFZLFVBQVUsb0JBQW9CLFVBQVU7QUFBQSxJQUMxRCxRQUFRO0FBQUEsTUFDTjtBQUFBLE1BQ0EsS0FBSztBQUFBLFFBQ0gsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRLEVBQUUsZ0JBQWdCO0FBQUEsTUFDMUIsYUFBYTtBQUFBLE1BQ2IsV0FBVyxRQUFRLFdBQVc7QUFBQSxNQUM5QixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsY0FBYztBQUFBLE1BQ2QsUUFBUTtBQUFBLE1BQ1IsWUFBWTtBQUFBLE1BQ1osZUFBZTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0wsS0FBSyxFQUFFLDBCQUEwQjtBQUFBLFVBQ2pDLE9BQU8sRUFBRSw0QkFBNEI7QUFBQSxRQUl2QztBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sY0FBYztBQUFBLFlBRVosaUJBQWlCO0FBQUEsY0FDZjtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxTQUFTO0FBQUEsVUFDUCxXQUFXO0FBQUEsWUFDVCxVQUFVO0FBQUEsWUFDVixVQUFVO0FBQUEsWUFDVixZQUFZO0FBQUEsVUFDZCxDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUMsR0FBRyxhQUFhLE9BQVE7QUFBQSxFQUNwQztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

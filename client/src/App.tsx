import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Live from "./pages/Live";
import Highlights from "./pages/Highlights";
import Upload from "./pages/Upload";
import SportPage from "./pages/SportPage";
import VideoPlayer from "./pages/VideoPlayer";
import Footer from "./components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/live" component={Live} />
      <Route path="/highlights" component={Highlights} />
      <Route path="/upload" component={Upload} />
      <Route path="/sports/:sport">
        {(params) => <SportPage sport={params.sport} />}
      </Route>
      <Route path="/watch/:id">
        {(params) => <VideoPlayer id={params.id} />}
      </Route>
      <Route path="/watch/highlight/:id">
        {(params) => <VideoPlayer isHighlight={true} id={params.id} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
          <NavBar />
          <div className="flex-grow">
            <Router />
          </div>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

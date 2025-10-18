import { Shield, Loader2, Link as LinkIcon, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAnalysis } from '@/contexts/AnalysisContext';
import { toast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

const DetectionModule = () => {
  const { inputContent, setInputContent, isLoading, performAnalysis, performMockAnalysis, useMockMode, setUseMockMode } = useAnalysis();

  // Detect if input contains a URL
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const containsUrl = urlPattern.test(inputContent);

  const handleCheck = async () => {
    if (!inputContent.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to analyze",
        variant: "destructive",
      });
      return;
    }

    await performAnalysis();
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Analysis Console Header */}
      <div className="space-y-3 border-l-4 border-primary pl-4">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <Label htmlFor="news-input" className="text-2xl font-bold text-foreground tracking-wide uppercase">
              Analysis Console
            </Label>
            <p className="text-sm text-muted-foreground font-mono">
              &gt; Input news content for credibility verification
            </p>
          </div>
          
          {/* Testing Mode Toggle */}
          <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            <Label htmlFor="mock-mode" className="text-sm font-mono cursor-pointer">
              TESTING MODE
            </Label>
            <Switch
              id="mock-mode"
              checked={useMockMode}
              onCheckedChange={setUseMockMode}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      
      {/* Mock Testing Panel */}
      {useMockMode && (
        <Card className="p-6 border-2 border-primary/30 bg-primary/5 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              Testing Scenarios
            </h3>
            <p className="text-sm text-muted-foreground">
              Test the loading screen and different credibility outcomes using predefined mock data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              onClick={() => performMockAnalysis('high-credibility')}
              disabled={isLoading}
              variant="outline"
              className="flex flex-col gap-2 h-auto py-4 border-2 border-success/50 hover:bg-success/10"
            >
              <div className="text-lg">✅</div>
              <div className="font-bold">High Credibility</div>
              <div className="text-xs text-muted-foreground">Score: 95 | 3s delay</div>
            </Button>
            
            <Button
              onClick={() => performMockAnalysis('medium-credibility')}
              disabled={isLoading}
              variant="outline"
              className="flex flex-col gap-2 h-auto py-4 border-2 border-yellow-500/50 hover:bg-yellow-500/10"
            >
              <div className="text-lg">⚠️</div>
              <div className="font-bold">Medium Credibility</div>
              <div className="text-xs text-muted-foreground">Score: 55 | 4s delay</div>
            </Button>
            
            <Button
              onClick={() => performMockAnalysis('low-credibility')}
              disabled={isLoading}
              variant="outline"
              className="flex flex-col gap-2 h-auto py-4 border-2 border-danger/50 hover:bg-danger/10"
            >
              <div className="text-lg">❌</div>
              <div className="font-bold">Low Credibility</div>
              <div className="text-xs text-muted-foreground">Score: 10 | 5s delay</div>
            </Button>
          </div>
        </Card>
      )}

      {/* Secure Terminal Input */}
      <div className="relative border-2 border-primary/30 rounded-lg p-1 shadow-[0_0_20px_hsl(190_100%_50%_/_0.2)]">
        <div className="absolute top-0 left-0 right-0 h-8 bg-primary/10 rounded-t-lg border-b border-primary/30 flex items-center px-3 gap-2">
          <div className="w-3 h-3 rounded-full bg-danger/60"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-success/60"></div>
          <span className="ml-2 text-xs text-muted-foreground font-mono">SECURE TERMINAL</span>
          {containsUrl && (
            <Badge variant="secondary" className="ml-auto flex items-center gap-1 text-xs">
              <LinkIcon className="h-3 w-3" />
              URL Detected
            </Badge>
          )}
        </div>
        <Textarea
          id="news-input"
          placeholder="// Paste article text or URL here for analysis..."
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          className="min-h-[250px] text-base bg-card border-0 focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all resize-none font-mono pt-10"
          disabled={isLoading}
        />
        <div className="absolute bottom-4 right-4 text-xs text-primary font-mono">
          {inputContent.length} CHARS
        </div>
      </div>

      {/* Pulsing Scan Button */}
      <Button
        onClick={handleCheck}
        disabled={isLoading || !inputContent.trim()}
        size="lg"
        className="w-full bg-gradient-primary hover:shadow-glow text-primary-foreground transition-all duration-300 text-lg font-bold py-7 uppercase tracking-wider animate-pulse-cyan border-2 border-primary/50"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
            Scanning Content...
          </>
        ) : (
          <>
            <Shield className="mr-3 h-6 w-6" />
            Initiate Credibility Scan
          </>
        )}
      </Button>
    </div>
  );
};

export default DetectionModule;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProfile, ProfileData } from '../context/ProfileContext';
import { toast } from 'sonner';
import { 
  Save, LogOut, ArrowLeft, Upload, FileText, Plus, Trash2, ArrowUp, ArrowDown, 
  User, Briefcase, GraduationCap, Award, BookOpen, Microscope, Book, 
  HelpCircle, Check, Shield, FileCheck
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { profile, loading: profileLoading, user, updateProfile, signOut } = useProfile();
  
  // Local state for the editable profile data
  const [editedData, setEditedData] = useState<ProfileData | null>(null);
  const [saving, setSaving] = useState(false);

  // Authorization check and data loading
  useEffect(() => {
    if (!profileLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, profileLoading, navigate]);

  useEffect(() => {
    if (profile) {
      // Create a deep copy of the profile data for safe editing
      setEditedData(JSON.parse(JSON.stringify(profile)));
    }
  }, [profile]);

  if (profileLoading || !user || !editedData) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-950 text-white gap-4">
        <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-sm text-gray-400 font-medium">Authorizing session...</p>
      </div>
    );
  }

  // Generic value changers
  const handleTextChange = (field: keyof ProfileData, value: string) => {
    setEditedData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleNestedChange = (parent: keyof ProfileData, field: string, value: string) => {
    setEditedData(prev => {
      if (!prev) return null;
      const copy = { ...prev };
      (copy[parent] as any)[field] = value;
      return copy;
    });
  };

  // Convert files to Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'photoUrl' | 'resumeUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 10MB Limit
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds the 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleTextChange(field, reader.result);
        toast.success(`${field === 'photoUrl' ? 'Photo' : 'Resume'} file uploaded in-memory.`);
      }
    };
    reader.onerror = () => {
      toast.error('Error reading file.');
    };
    reader.readAsDataURL(file);
  };

  // Main save function
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(editedData);
      toast.success('Portfolio changes saved successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully.');
      navigate('/');
    } catch (err: any) {
      toast.error(err.message || 'Error signing out.');
    }
  };

  /* ── Array List Reordering & Editing Helpers ──────────────── */
  const moveItem = (arrayName: string, subArrayName: string | null, index: number, direction: 'up' | 'down') => {
    setEditedData(prev => {
      if (!prev) return null;
      const copy = { ...prev };
      let list: any[];

      if (subArrayName) {
        list = (copy[arrayName as keyof ProfileData] as any)[subArrayName];
      } else {
        list = copy[arrayName as keyof ProfileData] as any[];
      }

      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === list.length - 1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;

      return copy;
    });
  };

  const deleteItem = (arrayName: string, subArrayName: string | null, index: number) => {
    setEditedData(prev => {
      if (!prev) return null;
      const copy = { ...prev };
      
      if (subArrayName) {
        (copy[arrayName as keyof ProfileData] as any)[subArrayName].splice(index, 1);
      } else {
        (copy[arrayName as keyof ProfileData] as any[]).splice(index, 1);
      }
      return copy;
    });
  };

  const addStringItem = (arrayName: string, subArrayName: string | null, defaultValue: string = '') => {
    setEditedData(prev => {
      if (!prev) return null;
      const copy = { ...prev };
      
      if (subArrayName) {
        const target = (copy[arrayName as keyof ProfileData] as any);
        if (!target[subArrayName]) target[subArrayName] = [];
        target[subArrayName].push(defaultValue);
      } else {
        const target = copy[arrayName as keyof ProfileData] as any[];
        target.push(defaultValue);
      }
      return copy;
    });
  };

  const updateStringItem = (arrayName: string, subArrayName: string | null, index: number, value: string) => {
    setEditedData(prev => {
      if (!prev) return null;
      const copy = { ...prev };
      
      if (subArrayName) {
        (copy[arrayName as keyof ProfileData] as any)[subArrayName][index] = value;
      } else {
        (copy[arrayName as keyof ProfileData] as any[])[index] = value;
      }
      return copy;
    });
  };

  const addObjectItem = (arrayName: string, subArrayName: string | null, emptyObj: any) => {
    setEditedData(prev => {
      if (!prev) return null;
      const copy = { ...prev };
      
      if (subArrayName) {
        const target = (copy[arrayName as keyof ProfileData] as any);
        if (!target[subArrayName]) target[subArrayName] = [];
        target[subArrayName].push(emptyObj);
      } else {
        const target = copy[arrayName as keyof ProfileData] as any[];
        target.push(emptyObj);
      }
      return copy;
    });
  };

  const updateObjectItem = (arrayName: string, subArrayName: string | null, itemIndex: number, field: string, value: string) => {
    setEditedData(prev => {
      if (!prev) return null;
      const copy = { ...prev };
      
      if (subArrayName) {
        (copy[arrayName as keyof ProfileData] as any)[subArrayName][itemIndex][field] = value;
      } else {
        (copy[arrayName as keyof ProfileData] as any[])[itemIndex][field] = value;
      }
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
      
      {/* ── STICKY HEADER ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur border-b border-gray-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-500" />
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">Portfolio Manager</h1>
              <p className="text-[10px] text-gray-500">Logged in as {user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Site View
            </a>
            
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 font-semibold text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* ── MAIN LAYOUT ──────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800 p-1 w-full flex flex-wrap h-auto gap-1">
            <TabsTrigger value="general" className="flex-1 py-2 text-xs font-semibold data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <User className="w-3.5 h-3.5 mr-1" /> General & Uploads
            </TabsTrigger>
            <TabsTrigger value="about" className="flex-1 py-2 text-xs font-semibold data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Briefcase className="w-3.5 h-3.5 mr-1" /> Experience & Education
            </TabsTrigger>
            <TabsTrigger value="research" className="flex-1 py-2 text-xs font-semibold data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Microscope className="w-3.5 h-3.5 mr-1" /> Research & Teaching
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex-1 py-2 text-xs font-semibold data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <BookOpen className="w-3.5 h-3.5 mr-1" /> Publications & Patents
            </TabsTrigger>
          </TabsList>

          {/* ────────────────────────────────────────────────────────
              TAB 1: GENERAL & UPLOADS
              ──────────────────────────────────────────────────────── */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Profile Bio Form */}
              <div className="md:col-span-2 space-y-6">
                <Card className="bg-gray-900 border-gray-850 text-white">
                  <CardHeader>
                    <CardTitle className="text-base">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-400">Full Name</Label>
                        <Input
                          value={editedData.name}
                          onChange={e => handleTextChange('name', e.target.value)}
                          className="bg-gray-950 border-gray-800 text-sm h-10 text-white placeholder-gray-600 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-400">Title / Designation</Label>
                        <Input
                          value={editedData.title}
                          onChange={e => handleTextChange('title', e.target.value)}
                          className="bg-gray-950 border-gray-800 text-sm h-10 text-white placeholder-gray-600 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs text-gray-400">Institution</Label>
                      <Input
                        value={editedData.institution}
                        onChange={e => handleTextChange('institution', e.target.value)}
                        className="bg-gray-950 border-gray-800 text-sm h-10 text-white placeholder-gray-600 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-400">Email address</Label>
                        <Input
                          value={editedData.email}
                          onChange={e => handleTextChange('email', e.target.value)}
                          className="bg-gray-950 border-gray-800 text-sm h-10 text-white placeholder-gray-600 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-400">Mobile Phone</Label>
                        <Input
                          value={editedData.mobile}
                          onChange={e => handleTextChange('mobile', e.target.value)}
                          className="bg-gray-950 border-gray-800 text-sm h-10 text-white placeholder-gray-600 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs text-gray-400">Summary Statement</Label>
                      <Textarea
                        value={editedData.summary}
                        onChange={e => handleTextChange('summary', e.target.value)}
                        className="bg-gray-950 border-gray-800 text-sm text-white placeholder-gray-600 min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs text-gray-400">Full Academic Biography</Label>
                      <Textarea
                        value={editedData.bio}
                        onChange={e => handleTextChange('bio', e.target.value)}
                        className="bg-gray-950 border-gray-800 text-sm text-white placeholder-gray-600 min-h-[140px]"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Social Profiles */}
                <Card className="bg-gray-900 border-gray-850 text-white">
                  <CardHeader>
                    <CardTitle className="text-base">Academic & Social Profiles</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['googleScholar', 'researchGate', 'scopus', 'orcid'].map(key => (
                      <div key={key} className="space-y-1">
                        <Label className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                        <Input
                          value={editedData.urls[key]}
                          onChange={e => handleNestedChange('urls', key, e.target.value)}
                          className="bg-gray-950 border-gray-800 text-xs h-9 text-white focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Uploads and stats sidebar */}
              <div className="space-y-6">
                {/* Image & PDF Dropzone */}
                <Card className="bg-gray-900 border-gray-850 text-white">
                  <CardHeader>
                    <CardTitle className="text-base">Media Assets & File Uploads</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Profile Photo */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-gray-400">Profile Photo</Label>
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-800 bg-gray-950 flex-shrink-0">
                          {editedData.photoUrl ? (
                            <img src={editedData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600 text-[10px]">No Photo</div>
                          )}
                        </div>
                        <label className="flex-1 flex flex-col items-center justify-center h-16 border-2 border-dashed border-gray-800 hover:border-blue-500/50 rounded-lg cursor-pointer bg-gray-950 hover:bg-gray-900/50 transition-colors">
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Select Image</span>
                          </div>
                          <p className="text-[9px] text-gray-600 mt-0.5">PNG, JPG up to 10MB</p>
                          <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'photoUrl')} className="hidden" />
                        </label>
                      </div>
                    </div>

                    {/* Resume PDF */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-gray-400">Curriculum Vitae (CV) PDF</Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-800 hover:border-blue-500/50 rounded-lg cursor-pointer bg-gray-950 hover:bg-gray-900/50 transition-colors">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          {editedData.resumeUrl ? (
                            <FileCheck className="w-4 h-4 text-green-500" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                          <span>{editedData.resumeUrl ? 'Resume Uploaded (Change)' : 'Upload Resume PDF'}</span>
                        </div>
                        <p className="text-[9px] text-gray-600 mt-0.5">PDF up to 10MB</p>
                        <input type="file" accept="application/pdf" onChange={e => handleFileUpload(e, 'resumeUrl')} className="hidden" />
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Dashboard Stats */}
                <Card className="bg-gray-900 border-gray-850 text-white">
                  <CardHeader>
                    <CardTitle className="text-base">Website Dashboard Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.keys(editedData.stats).map(key => (
                      <div key={key} className="flex items-center justify-between gap-4">
                        <Label className="text-xs text-gray-400 capitalize">{key}</Label>
                        <Input
                          value={editedData.stats[key]}
                          onChange={e => handleNestedChange('stats', key, e.target.value)}
                          className="bg-gray-950 border-gray-800 text-xs h-8 text-right max-w-[120px] text-white focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

            </div>
          </TabsContent>

          {/* ────────────────────────────────────────────────────────
              TAB 2: EXPERIENCE & EDUCATION
              ──────────────────────────────────────────────────────── */}
          <TabsContent value="about" className="space-y-6">
            
            {/* Experience editor */}
            <Card className="bg-gray-900 border-gray-850 text-white">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Professional Experience</CardTitle>
                  <CardDescription className="text-xs">Add, edit, or rearrange your academic or industry job history.</CardDescription>
                </div>
                <Button
                  onClick={() => addObjectItem('experience', null, { position: 'New Position', institution: 'New Institution', duration: '2026 - Present', details: '' })}
                  className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {(editedData.experience || []).map((exp, idx) => (
                  <div key={idx} className="p-4 border border-gray-800 rounded-lg bg-gray-950 relative space-y-3 group">
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      <button onClick={() => moveItem('experience', null, idx, 'up')} className="text-gray-500 hover:text-white p-1" disabled={idx === 0}>
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => moveItem('experience', null, idx, 'down')} className="text-gray-500 hover:text-white p-1" disabled={idx === editedData.experience.length - 1}>
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteItem('experience', null, idx)} className="text-gray-500 hover:text-red-500 p-1 ml-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-20">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500">Position / Role</Label>
                        <Input
                          value={exp.position}
                          onChange={e => updateObjectItem('experience', null, idx, 'position', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500">Institution / Company</Label>
                        <Input
                          value={exp.institution}
                          onChange={e => updateObjectItem('experience', null, idx, 'institution', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500">Duration (e.g. Nov 2023 - Present)</Label>
                        <Input
                          value={exp.duration}
                          onChange={e => updateObjectItem('experience', null, idx, 'duration', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500">Responsibilities / Accomplishments</Label>
                      <Textarea
                        value={exp.details}
                        onChange={e => updateObjectItem('experience', null, idx, 'details', e.target.value)}
                        className="bg-gray-900 border-gray-800 text-xs text-white placeholder-gray-700 min-h-[60px]"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education editor */}
            <Card className="bg-gray-900 border-gray-850 text-white">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Education Chronology</CardTitle>
                  <CardDescription className="text-xs">Add, edit, or rearrange your academic degrees and educational timeline.</CardDescription>
                </div>
                <Button
                  onClick={() => addObjectItem('education', null, { degree: 'New Degree', institution: 'University Name', year: '2026', details: '' })}
                  className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {(editedData.education || []).map((edu, idx) => (
                  <div key={idx} className="p-4 border border-gray-800 rounded-lg bg-gray-950 relative space-y-3 group">
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      <button onClick={() => moveItem('education', null, idx, 'up')} className="text-gray-500 hover:text-white p-1" disabled={idx === 0}>
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => moveItem('education', null, idx, 'down')} className="text-gray-500 hover:text-white p-1" disabled={idx === editedData.education.length - 1}>
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteItem('education', null, idx)} className="text-gray-500 hover:text-red-500 p-1 ml-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-20">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500">Degree / Qualification</Label>
                        <Input
                          value={edu.degree}
                          onChange={e => updateObjectItem('education', null, idx, 'degree', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500">Institution Name</Label>
                        <Input
                          value={edu.institution}
                          onChange={e => updateObjectItem('education', null, idx, 'institution', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500">Completion Year (e.g. 2019)</Label>
                        <Input
                          value={edu.year}
                          onChange={e => updateObjectItem('education', null, idx, 'year', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500">Grade / Thesis details</Label>
                      <Input
                        value={edu.details}
                        onChange={e => updateObjectItem('education', null, idx, 'details', e.target.value)}
                        className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Administrative Roles */}
            <Card className="bg-gray-900 border-gray-850 text-white">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Administrative & Professional Roles</CardTitle>
                  <CardDescription className="text-xs">Add roles, committees, or coordinator titles.</CardDescription>
                </div>
                <Button
                  onClick={() => addStringItem('administrativeRoles', null, 'New Administrative Role details')}
                  className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Role
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {(editedData.administrativeRoles || []).map((role, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <button onClick={() => moveItem('administrativeRoles', null, idx, 'up')} className="text-gray-500 hover:text-white" disabled={idx === 0}>
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button onClick={() => moveItem('administrativeRoles', null, idx, 'down')} className="text-gray-500 hover:text-white" disabled={idx === editedData.administrativeRoles.length - 1}>
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <Input
                      value={role}
                      onChange={e => updateStringItem('administrativeRoles', null, idx, e.target.value)}
                      className="bg-gray-950 border-gray-850 text-xs h-9 text-white focus:border-blue-500 flex-1"
                    />
                    <button onClick={() => deleteItem('administrativeRoles', null, idx)} className="text-gray-500 hover:text-red-500 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Professional Memberships */}
            <Card className="bg-gray-900 border-gray-850 text-white">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Professional Memberships</CardTitle>
                  <CardDescription className="text-xs">Organizations you are affiliated with (e.g. IEEE, ISTE).</CardDescription>
                </div>
                <Button
                  onClick={() => addStringItem('memberships', null, 'New Society Life Member')}
                  className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Society
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {(editedData.memberships || []).map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      value={m}
                      onChange={e => updateStringItem('memberships', null, idx, e.target.value)}
                      className="bg-gray-950 border-gray-850 text-xs h-9 text-white focus:border-blue-500 flex-1"
                    />
                    <button onClick={() => deleteItem('memberships', null, idx)} className="text-gray-500 hover:text-red-500 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

          </TabsContent>

          {/* ────────────────────────────────────────────────────────
              TAB 3: RESEARCH & TEACHING
              ──────────────────────────────────────────────────────── */}
          <TabsContent value="research" className="space-y-6">
            
            {/* Research areas */}
            <Card className="bg-gray-900 border-gray-850 text-white">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Core Research Areas</CardTitle>
                  <CardDescription className="text-xs">These display as custom grid cards on your home and research pages.</CardDescription>
                </div>
                <Button
                  onClick={() => addObjectItem('researchInterests', null, { title: 'New Interest', description: 'Description of research area' })}
                  className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Area
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {(editedData.researchInterests || []).map((ri, idx) => (
                  <div key={idx} className="p-3 border border-gray-800 rounded-lg bg-gray-950 relative space-y-2 group">
                    <button onClick={() => deleteItem('researchInterests', null, idx)} className="absolute right-3 top-3 text-gray-500 hover:text-red-500 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pr-12">
                      <div className="space-y-1 sm:col-span-1">
                        <Label className="text-[10px] text-gray-500 font-semibold">Title</Label>
                        <Input
                          value={ri.title}
                          onChange={e => updateObjectItem('researchInterests', null, idx, 'title', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-3">
                        <Label className="text-[10px] text-gray-500 font-semibold">Short description</Label>
                        <Input
                          value={ri.description}
                          onChange={e => updateObjectItem('researchInterests', null, idx, 'description', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Subjects Taught */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* UG Courses */}
              <Card className="bg-gray-900 border-gray-850 text-white">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-sm font-bold">Undergraduate (UG) Courses</CardTitle>
                  </div>
                  <Button
                    onClick={() => addStringItem('subjectsTaught', 'ug', 'New UG Course')}
                    className="bg-gray-850 hover:bg-gray-800 text-[10px] h-7 px-2 border border-gray-700 text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Course
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
                  {(editedData.subjectsTaught?.ug || []).map((course, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={course}
                        onChange={e => updateStringItem('subjectsTaught', 'ug', idx, e.target.value)}
                        className="bg-gray-950 border-gray-850 text-xs h-8 text-white focus:border-blue-500 flex-1"
                      />
                      <button onClick={() => deleteItem('subjectsTaught', 'ug', idx)} className="text-gray-500 hover:text-red-500 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* PG Courses */}
              <Card className="bg-gray-900 border-gray-850 text-white">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-sm font-bold">Postgraduate (PG) Courses</CardTitle>
                  </div>
                  <Button
                    onClick={() => addStringItem('subjectsTaught', 'pg', 'New PG Course')}
                    className="bg-gray-850 hover:bg-gray-800 text-[10px] h-7 px-2 border border-gray-700 text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Course
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
                  {(editedData.subjectsTaught?.pg || []).map((course, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={course}
                        onChange={e => updateStringItem('subjectsTaught', 'pg', idx, e.target.value)}
                        className="bg-gray-950 border-gray-850 text-xs h-8 text-white focus:border-blue-500 flex-1"
                      />
                      <button onClick={() => deleteItem('subjectsTaught', 'pg', idx)} className="text-gray-500 hover:text-red-500 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Student Guidance */}
            <div className="space-y-6">
              {/* PhD Scholars */}
              <Card className="bg-gray-900 border-gray-850 text-white">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Ph.D. Scholars Supervision</CardTitle>
                    <CardDescription className="text-xs">Add PhD scholars under your supervision.</CardDescription>
                  </div>
                  <Button
                    onClick={() => addObjectItem('studentGuidance', 'phd', { name: 'Scholar Name', university: 'University Name', status: 'Ongoing (2026)' })}
                    className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Scholar
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(editedData.studentGuidance?.phd || []).map((phd, idx) => (
                    <div key={idx} className="p-3 border border-gray-800 rounded-lg bg-gray-950 relative space-y-2 group">
                      <button onClick={() => deleteItem('studentGuidance', 'phd', idx)} className="absolute right-3 top-3 text-gray-500 hover:text-red-500 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-12">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-gray-500 font-semibold">Scholar Name</Label>
                          <Input
                            value={phd.name}
                            onChange={e => updateObjectItem('studentGuidance', 'phd', idx, 'name', e.target.value)}
                            className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-gray-500 font-semibold">University Affiliation</Label>
                          <Input
                            value={phd.university}
                            onChange={e => updateObjectItem('studentGuidance', 'phd', idx, 'university', e.target.value)}
                            className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-gray-500 font-semibold">Status / Details (e.g. Awarded (2025))</Label>
                          <Input
                            value={phd.status}
                            onChange={e => updateObjectItem('studentGuidance', 'phd', idx, 'status', e.target.value)}
                            className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* PG Dissertations Guided */}
              <Card className="bg-gray-900 border-gray-850 text-white">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">PG Dissertations Guided</CardTitle>
                    <CardDescription className="text-xs">Add Master's project titles and scholar years.</CardDescription>
                  </div>
                  <Button
                    onClick={() => addStringItem('studentGuidance', 'pg', 'New PG Dissertation Title (2026)')}
                    className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Dissertation
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(editedData.studentGuidance?.pg || []).map((diss, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={diss}
                        onChange={e => updateStringItem('studentGuidance', 'pg', idx, e.target.value)}
                        className="bg-gray-950 border-gray-850 text-xs h-9 text-white focus:border-blue-500 flex-1"
                      />
                      <button onClick={() => deleteItem('studentGuidance', 'pg', idx)} className="text-gray-500 hover:text-red-500 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

          </TabsContent>

          {/* ────────────────────────────────────────────────────────
              TAB 4: PUBLICATIONS & ACHIEVEMENTS
              ──────────────────────────────────────────────────────── */}
          <TabsContent value="publications" className="space-y-6">
            
            {/* Journals */}
            <Card className="bg-gray-900 border-gray-850 text-white">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Academic Journals</CardTitle>
                  <CardDescription className="text-xs">Edit peer-reviewed journals published in Springer, Elsevier, etc.</CardDescription>
                </div>
                <Button
                  onClick={() => addObjectItem('publications', 'journals', { title: 'New Journal Article', authors: 'Sushopti Gawade', journal: 'Journal Name, Elsevier', year: '2026', link: '' })}
                  className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Journal
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {(editedData.publications?.journals || []).map((pub, idx) => (
                  <div key={idx} className="p-3 border border-gray-800 rounded-lg bg-gray-950 relative space-y-2 group">
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      <button onClick={() => moveItem('publications', 'journals', idx, 'up')} className="text-gray-500 hover:text-white" disabled={idx === 0}>
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button onClick={() => moveItem('publications', 'journals', idx, 'down')} className="text-gray-500 hover:text-white" disabled={idx === editedData.publications.journals.length - 1}>
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button onClick={() => deleteItem('publications', 'journals', idx)} className="text-gray-500 hover:text-red-500 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="space-y-1.5 pr-20">
                      <div>
                        <Label className="text-[9px] text-gray-500 font-semibold">Publication Title</Label>
                        <Input
                          value={pub.title}
                          onChange={e => updateObjectItem('publications', 'journals', idx, 'title', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <div className="sm:col-span-2">
                          <Label className="text-[9px] text-gray-500 font-semibold">Authors (comma separated)</Label>
                          <Input
                            value={pub.authors}
                            onChange={e => updateObjectItem('publications', 'journals', idx, 'authors', e.target.value)}
                            className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <Label className="text-[9px] text-gray-500 font-semibold">Journal & Volume</Label>
                          <Input
                            value={pub.journal}
                            onChange={e => updateObjectItem('publications', 'journals', idx, 'journal', e.target.value)}
                            className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <Label className="text-[9px] text-gray-500 font-semibold">Year (e.g. 2024)</Label>
                          <Input
                            value={pub.year}
                            onChange={e => updateObjectItem('publications', 'journals', idx, 'year', e.target.value)}
                            className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-[9px] text-gray-500 font-semibold">URL Link (e.g. https://doi.org/...)</Label>
                        <Input
                          value={pub.link || ''}
                          onChange={e => updateObjectItem('publications', 'journals', idx, 'link', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Conferences */}
            <Card className="bg-gray-900 border-gray-850 text-white">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Conference Publications</CardTitle>
                  <CardDescription className="text-xs">Add papers published at IEEE, Springer, etc. conferences.</CardDescription>
                </div>
                <Button
                  onClick={() => addObjectItem('publications', 'conferences', { title: 'New Conference Paper', authors: 'Sushopti Gawade', journal: 'IEEE International Conference', year: '2026', link: '' })}
                  className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Conference
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {(editedData.publications?.conferences || []).map((pub, idx) => (
                  <div key={idx} className="p-3 border border-gray-800 rounded-lg bg-gray-950 relative space-y-2 group">
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      <button onClick={() => moveItem('publications', 'conferences', idx, 'up')} className="text-gray-500 hover:text-white" disabled={idx === 0}>
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button onClick={() => moveItem('publications', 'conferences', idx, 'down')} className="text-gray-500 hover:text-white" disabled={idx === editedData.publications.conferences.length - 1}>
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button onClick={() => deleteItem('publications', 'conferences', idx)} className="text-gray-500 hover:text-red-500 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="space-y-1.5 pr-20">
                      <div>
                        <Label className="text-[9px] text-gray-500 font-semibold">Publication Title</Label>
                        <Input
                          value={pub.title}
                          onChange={e => updateObjectItem('publications', 'conferences', idx, 'title', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <div className="sm:col-span-2">
                          <Label className="text-[9px] text-gray-500 font-semibold">Authors</Label>
                          <Input
                            value={pub.authors}
                            onChange={e => updateObjectItem('publications', 'conferences', idx, 'authors', e.target.value)}
                            className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <Label className="text-[9px] text-gray-500 font-semibold">Conference / Book</Label>
                          <Input
                            value={pub.journal}
                            onChange={e => updateObjectItem('publications', 'conferences', idx, 'journal', e.target.value)}
                            className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <Label className="text-[9px] text-gray-500 font-semibold">Year</Label>
                          <Input
                            value={pub.year}
                            onChange={e => updateObjectItem('publications', 'conferences', idx, 'year', e.target.value)}
                            className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-[9px] text-gray-500 font-semibold">URL Link</Label>
                        <Input
                          value={pub.link || ''}
                          onChange={e => updateObjectItem('publications', 'conferences', idx, 'link', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Books & Chapters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Books */}
              <Card className="bg-gray-900 border-gray-850 text-white">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-sm font-bold">Books Published</CardTitle>
                  </div>
                  <Button
                    onClick={() => addObjectItem('publications', 'books', { title: 'New Book', publisher: 'Publisher', isbn: '', year: '2026' })}
                    className="bg-gray-850 hover:bg-gray-800 text-[10px] h-7 px-2 border border-gray-700 text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Book
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[350px] overflow-y-auto">
                  {(editedData.publications?.books || []).map((book, idx) => (
                    <div key={idx} className="p-3 border border-gray-800 rounded-lg bg-gray-950 relative space-y-2 group">
                      <button onClick={() => deleteItem('publications', 'books', idx)} className="absolute right-2 top-2 text-gray-500 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="space-y-1 pr-6">
                        <Label className="text-[9px] text-gray-500">Book Title</Label>
                        <Input
                          value={book.title}
                          onChange={e => updateObjectItem('publications', 'books', idx, 'title', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-7 text-white"
                        />
                        <div className="grid grid-cols-3 gap-1">
                          <div>
                            <Label className="text-[9px] text-gray-500">Publisher</Label>
                            <Input
                              value={book.publisher}
                              onChange={e => updateObjectItem('publications', 'books', idx, 'publisher', e.target.value)}
                              className="bg-gray-900 border-gray-800 text-xs h-7 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-[9px] text-gray-500">ISBN</Label>
                            <Input
                              value={book.isbn}
                              onChange={e => updateObjectItem('publications', 'books', idx, 'isbn', e.target.value)}
                              className="bg-gray-900 border-gray-800 text-xs h-7 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-[9px] text-gray-500">Year</Label>
                            <Input
                              value={book.year}
                              onChange={e => updateObjectItem('publications', 'books', idx, 'year', e.target.value)}
                              className="bg-gray-900 border-gray-800 text-xs h-7 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Book Chapters */}
              <Card className="bg-gray-900 border-gray-850 text-white">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-sm font-bold">Book Chapters Published</CardTitle>
                  </div>
                  <Button
                    onClick={() => addObjectItem('publications', 'bookChapters', { title: 'New Chapter Title', book: 'Book Reference', year: '2026' })}
                    className="bg-gray-850 hover:bg-gray-800 text-[10px] h-7 px-2 border border-gray-700 text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Chapter
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[350px] overflow-y-auto">
                  {(editedData.publications?.bookChapters || []).map((ch, idx) => (
                    <div key={idx} className="p-3 border border-gray-800 rounded-lg bg-gray-950 relative space-y-2 group">
                      <button onClick={() => deleteItem('publications', 'bookChapters', idx)} className="absolute right-2 top-2 text-gray-500 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="space-y-1 pr-6">
                        <Label className="text-[9px] text-gray-500">Chapter Title</Label>
                        <Input
                          value={ch.title}
                          onChange={e => updateObjectItem('publications', 'bookChapters', idx, 'title', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-7 text-white"
                        />
                        <div className="grid grid-cols-3 gap-1">
                          <div className="col-span-2">
                            <Label className="text-[9px] text-gray-500">Book Context</Label>
                            <Input
                              value={ch.book}
                              onChange={e => updateObjectItem('publications', 'bookChapters', idx, 'book', e.target.value)}
                              className="bg-gray-900 border-gray-800 text-xs h-7 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-[9px] text-gray-500">Year</Label>
                            <Input
                              value={ch.year}
                              onChange={e => updateObjectItem('publications', 'bookChapters', idx, 'year', e.target.value)}
                              className="bg-gray-900 border-gray-800 text-xs h-7 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Patents */}
            <Card className="bg-gray-900 border-gray-850 text-white">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Patents Filed & Granted</CardTitle>
                  <CardDescription className="text-xs">Patent details, numbers, status, and dates.</CardDescription>
                </div>
                <Button
                  onClick={() => addObjectItem('patents', null, { title: 'New Invention', status: 'Published', date: 'April 2026', number: '' })}
                  className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Patent
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {(editedData.patents || []).map((patent, idx) => (
                  <div key={idx} className="p-3 border border-gray-800 rounded-lg bg-gray-950 relative space-y-2 group">
                    <button onClick={() => deleteItem('patents', null, idx)} className="absolute right-3 top-3 text-gray-500 hover:text-red-500 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="space-y-1 pr-12">
                      <Label className="text-[10px] text-gray-500 font-semibold">Patent Title</Label>
                      <Input
                        value={patent.title}
                        onChange={e => updateObjectItem('patents', null, idx, 'title', e.target.value)}
                        className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pr-12">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500 font-semibold">Status (Granted / Published / Applied)</Label>
                        <Input
                          value={patent.status}
                          onChange={e => updateObjectItem('patents', null, idx, 'status', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500 font-semibold">Design / Patent Number (Optional)</Label>
                        <Input
                          value={patent.number || ''}
                          onChange={e => updateObjectItem('patents', null, idx, 'number', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500 font-semibold">Date (e.g. March 2026)</Label>
                        <Input
                          value={patent.date}
                          onChange={e => updateObjectItem('patents', null, idx, 'date', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Copyrights */}
            <Card className="bg-gray-900 border-gray-850 text-white">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Software / Data Copyrights</CardTitle>
                  <CardDescription className="text-xs">Add official copyright registrations.</CardDescription>
                </div>
                <Button
                  onClick={() => addStringItem('copyrights', null, 'New Software Copyright Title (Registration No)')}
                  className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Copyright
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {(editedData.copyrights || []).map((cp, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      value={cp}
                      onChange={e => updateStringItem('copyrights', null, idx, e.target.value)}
                      className="bg-gray-950 border-gray-850 text-xs h-9 text-white focus:border-blue-500 flex-1"
                    />
                    <button onClick={() => deleteItem('copyrights', null, idx)} className="text-gray-500 hover:text-red-500 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Grants */}
            <Card className="bg-gray-900 border-gray-850 text-white">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Research Grants</CardTitle>
                  <CardDescription className="text-xs">Funded projects, amounts, agencies, and durations.</CardDescription>
                </div>
                <Button
                  onClick={() => addObjectItem('grants', null, { title: 'New Funded Project Name', agency: 'Funding Agency', amount: 'Rs. 50,000', duration: '1 Year' })}
                  className="bg-gray-850 hover:bg-gray-800 text-xs py-1 px-3 border border-gray-700 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Grant
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {(editedData.grants || []).map((grant, idx) => (
                  <div key={idx} className="p-3 border border-gray-800 rounded-lg bg-gray-950 relative space-y-2 group">
                    <button onClick={() => deleteItem('grants', null, idx)} className="absolute right-3 top-3 text-gray-500 hover:text-red-500 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="space-y-1 pr-12">
                      <Label className="text-[10px] text-gray-500 font-semibold">Grant / Project Title</Label>
                      <Input
                        value={grant.title}
                        onChange={e => updateObjectItem('grants', null, idx, 'title', e.target.value)}
                        className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pr-12">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500 font-semibold">Funding Agency</Label>
                        <Input
                          value={grant.agency}
                          onChange={e => updateObjectItem('grants', null, idx, 'agency', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500 font-semibold">Amount (e.g. Rs. 6,00,000)</Label>
                        <Input
                          value={grant.amount}
                          onChange={e => updateObjectItem('grants', null, idx, 'amount', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500 font-semibold">Duration (e.g. 10 months)</Label>
                        <Input
                          value={grant.duration}
                          onChange={e => updateObjectItem('grants', null, idx, 'duration', e.target.value)}
                          className="bg-gray-900 border-gray-800 text-xs h-8 text-white focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </TabsContent>

        </Tabs>
      </main>

      {/* ── STICKY FOOTER SAVE BAR ──────────────────────────────── */}
      <footer className="bg-gray-900 border-t border-gray-800 py-3 px-4 sm:px-6 lg:px-8 text-center sticky bottom-0 z-40 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-left hidden sm:block">
            Tip: Be sure to hit "Save Changes" after editing to write your modifications to the database.
          </p>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2 px-5 flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </footer>

    </div>
  );
}

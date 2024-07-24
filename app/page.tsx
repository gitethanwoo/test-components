'use client'

import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Home() {
  const [name, setName] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [copyStatus, setCopyStatus] = useState<string>('')
  const [logo, setLogo] = useState<string | null>(null)
  const [logoError, setLogoError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        if (e.target && typeof e.target.result === 'string') {
          const img = new Image()
          img.onload = (): void => {
            if (img.width <= 320 && img.height <= 320) {
              setLogo(e.target.result as string)
              setLogoError('')
            } else {
              setLogoError('Logo must be 320x320 pixels or smaller')
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }
          }
          img.src = e.target.result
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const generateSignature = (): string => {
    let signatureContent = `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:rgb(51,51,51)">
        <tbody>
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
    `

    // Add name and title if provided
    if (name || title) {
      signatureContent += `
                  <tr>
                    <td style="padding-bottom:10px">
                      ${name ? `<strong style="color:rgb(16,24,40);font-size:16px">${name}</strong>` : ''}
                      ${name && title ? '<br>' : ''}
                      ${title ? `<span style="color:rgb(102,112,133);font-size:14px">${title}</span>` : ''}
                    </td>
                  </tr>
      `
    }

    // Add email if provided
    if (email) {
      signatureContent += `
                  <tr>
                    <td style="padding-bottom:5px">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td style="padding-right:8px;vertical-align:middle">
                              <img src="https://lh3.googleusercontent.com/d/1IYy8Z172jZpVoCX2LgjruMti5JIQX_3g" alt="Email" width="16" height="16" style="display:block">
                            </td>
                            <td style="vertical-align:middle">
                              <a href="mailto:${email}" style="color:rgb(6,131,100);text-decoration-line:none;font-size:14px">${email}</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
      `
    }

    // Add website if provided
    if (website) {
      signatureContent += `
                <tr>
                  <td style="padding-bottom:5px">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
                          <td style="padding-right:8px;vertical-align:middle">
                            <img src="https://lh3.googleusercontent.com/d/10UgDSAhm_hDYimyp07y6uZDGnns8p5Kt" alt="Website" width="16" height="16" style="display:block">
                          </td>
                          <td style="vertical-align:middle">
                            <a href="https://${website}" style="color:rgb(6,131,100);text-decoration-line:none;font-size:14px">${website}</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
    `
    }

    // Add phone if provided
    if (phone) {
      signatureContent += `
                  <tr>
                    <td style="padding-bottom:5px">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td style="padding-right:8px;vertical-align:middle">
                              <img src="https://lh3.googleusercontent.com/d/1VTqPMIoSVTNL-m54GGXNpyQEEai6cKvi" alt="Phone" width="16" height="16" style="display:block">
                            </td>
                            <td style="vertical-align:middle">
                              <span style="color:rgb(16,24,40);font-size:14px">${phone}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
      `
    }

    // Add location if provided
    if (location) {
      signatureContent += `
                  <tr>
                    <td>
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td style="padding-right:8px;vertical-align:middle">
                              <img src="https://lh3.googleusercontent.com/d/13G5nLAXA-_ByAyKPVNqrzuoe5smdg01y" alt="Location" width="16" height="16" style="display:block">
                            </td>
                            <td style="vertical-align:middle">
                              <span style="color:rgb(16,24,40);font-size:14px">${location}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
      `
    }

    // Close the tables and add the logo if provided
    signatureContent += `
                </tbody>
              </table>
            </td>
          </tr>
    `

    if (logo) {
      signatureContent += `
          <tr>
            <td style="padding-top:15px">
              <img src="${logo}" alt="Company Logo" style="width:160px;height:auto;display:block">
            </td>
          </tr>
      `
    }

    signatureContent += `
        </tbody>
      </table>
    `

    return signatureContent
  }

  const copyToClipboard = async (): Promise<void> => {
    const signature = generateSignature()
    const plainText = signature.replace(/<[^>]+>/g, '').trim()

    try {
      if (navigator.clipboard && navigator.clipboard.write) {
        const clipboardItem = new ClipboardItem({
          'text/html': new Blob([signature], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' })
        })
        await navigator.clipboard.write([clipboardItem])
      } else {
        // Fallback for browsers that don't support the Clipboard API
        const tempElement = document.createElement('div')
        tempElement.innerHTML = signature
        document.body.appendChild(tempElement)
        const range = document.createRange()
        range.selectNodeContents(tempElement)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
        document.execCommand('copy')
        document.body.removeChild(tempElement)
      }
      setCopyStatus('Signature copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
      setCopyStatus('Failed to copy signature. Please try again.')
    }

    // Clear the status message after 3 seconds
    setTimeout(() => setCopyStatus(''), 3000)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Email Signature Generator</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Software Engineer" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (123) 456-7890" />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="San Angelo, TX" />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="www.example.com" />
        </div>
        <div>
          <Label htmlFor="logo">Logo (max 320x320 pixels)</Label>
          <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} ref={fileInputRef} />
          {logoError && <p className="text-red-500 text-sm mt-1">{logoError}</p>}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Preview:</h2>
        <div className="border p-4 rounded" dangerouslySetInnerHTML={{ __html: generateSignature() }} />
      </div>
      <Button onClick={copyToClipboard} className="w-full mt-4">Copy Signature</Button>
      {copyStatus && (
        <Alert className="mt-4">
          <AlertDescription>{copyStatus}</AlertDescription>
        </Alert>
      )}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4">How to Use</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>How to Use Your New Signature</AlertDialogTitle>
            <AlertDialogDescription>
              1. Fill in your information in the form fields.<br/>
              2. Leave any fields blank that you don&apos;t want to include.<br/>
              3. Upload a logo if desired (max 320x320 pixels).<br/>
              4. Click Copy Signature to copy the HTML to your clipboard.<br/>
              5. In your email client, go to signature settings.<br/>
              6. Create a new signature or edit an existing one.<br/>
              7. Paste the copied HTML into the signature field.<br/>
              8. Save your changes in the email client.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Got it!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
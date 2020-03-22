Attribute VB_Name = "Module1"
Option Explicit

Sub homework()

    Dim ticker As String
    Dim price_open As Double
    Dim price_close As Double
    Dim price_change As Double
    Dim pct_change As Double
    
    Dim tot_vol As Double
    
    Dim ws As Worksheet
    
    Dim i As Double
    
    Dim n As Double
    
    Dim bottomrow As Double
        
    Dim bottomout As Double
    
        
    Dim q As Double
    
        
    'loop through sheets
    For Each ws In ThisWorkbook.worksheets
        
        If ws.Name <> "Output" Then
            
            n = 2
            ticker = ws.Cells(n, 1).Value
            price_open = ws.Cells(n, 3).Value
            tot_vol = ws.Cells(n, 7).Value
            bottomrow = ws.Cells(Rows.Count, 1).End(xlUp).Row
  
    
    'loop through cells
    
                For i = 3 To bottomrow
                                    
                    If ws.Cells(i, 1).Value <> ticker And price_open <> 0 Then
                    
                        'pct change
                        
                        price_close = ws.Cells(i - 1, 6).Value
                        
                        price_change = price_close - price_open
                        
                        pct_change = price_change / price_open
                        
                                    
                        'titles
                        ws.Cells(1, 11).Value = "ticker"
                        ws.Cells(1, 12).Value = "price_change"
                        ws.Cells(1, 13).Value = "pct_change"
                        ws.Cells(1, 14).Value = "tot_vol"
                        
                        'outputs from directions
                        ws.Cells(n, 11).Value = ticker
                        ws.Cells(n, 12).Value = price_change
                        ws.Cells(n, 12).NumberFormat = "$0.00"
                        ws.Cells(n, 13).Value = pct_change
                        ws.Cells(n, 13).NumberFormat = "0.00%"
                        ws.Cells(n, 14).Value = tot_vol
                        
                        
                        'updating for next iteration
                        ticker = ws.Cells(i, 1).Value
                        price_open = ws.Cells(i, 3).Value
                        n = n + 1
                        tot_vol = 0
                    
                    ElseIf ws.Cells(i, 1).Value <> ticker And price_open = 0 Then
                        
                        price_close = ws.Cells(i - 1, 6).Value
                        
                        price_change = price_close - price_open
                        
                        pct_change = 0
                    
                        ws.Cells(n, 11).Value = ticker
                        ws.Cells(n, 12).Value = price_change
                        ws.Cells(n, 12).NumberFormat = "$0.00"
                        ws.Cells(n, 13).Value = pct_change
                        ws.Cells(n, 13).NumberFormat = "0.00%"
                        ws.Cells(n, 14).Value = tot_vol
                        
                        'updating for next iteration
                        ticker = ws.Cells(i, 1).Value
                        price_open = ws.Cells(i, 3).Value
                        'first_vol = ws.cells(i, 7)
                        n = n + 1
                        tot_vol = 0
                        
                    Else: tot_vol = tot_vol + ws.Cells(i, 7).Value
                    
                    End If
                
                    Next i
            
            End If
            
            Next ws
            
            
                              
    'total volume w conditional formatting
'    For Each ws In ThisWorkbook.worksheets
'
'        bottomout = ws.Cells(Rows.Count, 13).End(xlUp).Row
'
'        For q = 2 To bottomout
'
'            If ws.Cells(q, 13).Value >= 0 Then
'
'                ws.Cells(q, 13).Interior.ColorIndex = 4
'
'            Else
'
'                ws.Cells(q, 13).Interior.ColorIndex = 3
'
'            End If
'
'            Next q
'
'        Next ws
        
    
                
                    
                
End Sub
